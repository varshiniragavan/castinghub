
from flask_cors import CORS
from flask import *
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
import mysql.connector
from werkzeug.utils import secure_filename
import os
UPLOAD_FOLDER = './static'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# Utility function to check allowed file extensions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def connect():
    return mysql.connector.connect(host="localhost", user="root",  password="",  database="moviecast",auth_plugin = 'mysql_native_password',port='3306')

def check_similarity(e, dex):
    from sentence_transformers import SentenceTransformer, util

    # Initialize pre-trained model
    model = SentenceTransformer('all-MiniLM-L6-v2')  # Small and efficient

    # Extract requirements from the input list of tuples
    
    requirements = [item[9] for item in e]
    print(requirements)
    # Generate embeddings for dex and requirements
    dex_embedding = model.encode(dex, convert_to_tensor=True)
    requirements_embeddings = model.encode(requirements, convert_to_tensor=True)

    # Compute cosine similarity
    similarities = util.cos_sim(dex_embedding, requirements_embeddings)

    # Filter and return data from e if similarity is greater than 30%
    filtered_data = []
    for i, req in enumerate(requirements):
        match_percentage = similarities[0][i].item() * 100
        print(match_percentage)
        if match_percentage > 40:  # Check threshold
            filtered_data.append(e[i])  # Add matching entry from e to filtered_data
    print(filtered_data)
    return filtered_data

@app.route('/moviecast/searchusersdetails', methods=["POST"], strict_slashes=False)
def searchusersdetails():
    data = request.get_json()
    description = data.get('query', '')
    print(description)
    

    # Fetch all non-admin user details
    mydb = connect()
    mycursor = mydb.cursor()
    tx = "SELECT * FROM usersdetails WHERE role != 'admin'"
    mycursor.execute(tx)
    users = mycursor.fetchall()
    mydb.close()

    # Check similarity
    filtered_users = check_similarity(users, description)
    print(filtered_users)
    return jsonify(filtered_users)
@app.route('/moviecast/insertcastfileupload', methods=["POST"], strict_slashes=False)
def insertcastfileupload():
    try:
        # Parse form data
        r = request.form

        # Validate required fields
        required_fields = ['crid', 'status', 'description', 'userid']
        for field in required_fields:
            if field not in r:
                return jsonify({'error': f'{field} is required'}), 400

        # Handle file upload
        if 'fileupload' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400
        file = request.files['fileupload']

        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400

       

        # Save file securely
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(filepath)

        # Generate a new CFID
        mydb = connect()
        mycursor = mydb.cursor()
        tx = 'SELECT cfid FROM castfileupload ORDER BY cfid DESC LIMIT 1'
        mycursor.execute(tx)
        e = mycursor.fetchall()
        eid = 1 if len(e) == 0 else e[0][0] + 1

        # Insert into the database
        insert_query = """
        INSERT INTO castfileupload (cfid, crid, fileupload, status, description, userid)
        VALUES (%s, %s, %s, %s, %s, %s)
        """
        data = (eid, r['crid'], filename, r['status'], r['description'], r['userid'])
        mycursor.execute(insert_query, data)
        mydb.commit()

        return jsonify({'message': 'File uploaded and data inserted successfully'}), 200

    except Exception as e:
        
        return jsonify({'error': str(e)}), 500


    
@app.route('/moviecast/updatecastfileupload', methods=["POST"], strict_slashes=False)
def updatecastfileupload():
    r=request.json
    mydb = connect()
    d="update castfileupload set crid ='%s',fileupload ='%s',status ='%s',description ='%s' where cfid='%s'"%(r['crid'],r['fileupload'],r['status'],r['description'],r['cfid'])
    mycursor = mydb.cursor()
    mycursor.execute(d)
    mydb.commit()
    mydb.close()
    return 's'

@app.route('/moviecast/changecastfileupload', methods=["POST"], strict_slashes=False)
def changecastfileupload():
    r=request.json
    mydb = connect()
    d="update castfileupload set status ='%s' where cfid='%s'"%(r['approve'],r['cfid'])
    mycursor = mydb.cursor()
    mycursor.execute(d)
    mydb.commit()
    mydb.close()
    return 's'
    
@app.route('/moviecast/viewcastfileupload', methods=["POST"], strict_slashes=False)
def viewcastfileupload():
        mydb = connect()
        mycursor = mydb.cursor()
        tx="select *   from castfileupload"
        mycursor.execute(tx)
        e=mycursor.fetchall()
        mydb.close()
        return json.dumps(e)
@app.route('/moviecast/deletecastfileupload', methods=["POST"], strict_slashes=False)
def deletecastfileupload():
        r=request.json
        mydb = connect()
        mycursor = mydb.cursor()
        tx="delete from castfileupload where crid={0} and userid={1}".format(r['id'],r["userid"])
        mycursor.execute(tx)
        mydb.commit()
        mydb.close()
        return 's'
@app.route('/moviecast/insertcastformovie', methods=["POST"], strict_slashes=False)
def add_movie_and_cast():
    try:
        # Parse JSON data
        r = request.form
        

        # Handle file upload
        if 'movieimage' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        file = request.files['movieimage']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        if not allowed_file(file.filename):
            return jsonify({'error': 'File type not allowed'}), 400

        # Save the uploaded file
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # Connect to the database
        mydb = connect()
        mycursor = mydb.cursor()

        # Insert into castformovie table
        tx = 'SELECT cmid FROM castformovie ORDER BY cmid DESC LIMIT 1'
        mycursor.execute(tx)
        e = mycursor.fetchall()
        cmid = 1 if len(e) == 0 else e[0][0] + 1

        movie_query = """
        INSERT INTO castformovie 
        (cmid, moviename, movieimage, description, movieplanned, moviereleased, status,userid) 
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
        movie_data = (
            cmid, 
            r['moviename'], 
            filename,  # Store the file path in the database
            r['description'], 
            r['movieplanned'], 
            r['moviereleased'], 
            r['status'],
            r["userid"]
        )
        mycursor.execute(movie_query, movie_data)

        cast_entries = json.loads(r.get('castdetails', '[]'))  # Assuming castdetails is a JSON string
        for entry in cast_entries:
            crid_query = 'SELECT crid FROM castrequired ORDER BY crid DESC LIMIT 1'
            mycursor.execute(crid_query)
            result = mycursor.fetchall()
            crid = 1 if not result else result[0][0] + 1

            mycursor.execute(
                "INSERT INTO castrequired (crid, castname, role, totalnoofuser, cmid, status) "
                "VALUES (%s, %s, %s, %s, %s, %s)",
                (crid, entry['castname'], entry['role'], entry['totalnoofuser'], cmid, 'available')
            )

        mydb.commit()

        # Commit and close connection
        mydb.commit()
        mydb.close()

        return jsonify({'message': 'Movie and cast added successfully'}), 200

    except Exception as e:
        
        return jsonify({'error': str(e)}), 500
    
@app.route('/moviecast/updatecastformovie', methods=["POST"], strict_slashes=False)
def updatecastformovie():
    try:
        # Parse form data
        r = request.form
        

        # Extract necessary fields
        cmid = r.get("cmid")
        userid = r.get("userid")
        if not cmid or not userid:
            return jsonify({'error': 'Missing cmid or userid'}), 400
    
        # Handle file upload
        file = request.files.get('movieimage')
        
        if file and file.filename:
            if not allowed_file(file.filename):
                return jsonify({'error': 'File type not allowed'}), 400
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)

        # Connect to the database
        mydb = connect()
        mycursor = mydb.cursor()

        # Update movie details
        movie_query = """
        UPDATE castformovie 
        SET moviename = %s, 
            movieimage = %s, 
            description = %s, 
            movieplanned = %s, 
            moviereleased = %s, 
            postdate = %s, 
            status = %s 
        WHERE cmid = %s
        """
        movie_data = (
            r.get('moviename'),
            filename if filename else None,  # Only update if new image is uploaded
            r.get('description'),
            r.get('movieplanned'),
            r.get('moviereleased'),
            r.get('postdate'),
            r.get('status'),
            cmid
        )
        mycursor.execute(movie_query, movie_data)

        # Update cast entries
        cast_entries = json.loads(r.get('castdetails', '[]'))  # Parse cast details JSON
        for entry in cast_entries:
            cast_query = """
            UPDATE castrequired 
            SET castname = %s, role = %s, totalnoofuser = %s, cmid = %s, status = %s 
            WHERE crid = %s
            """
            mycursor.execute(
                cast_query,
                (entry.get('castname'), entry.get('role'), entry.get('totalnoofuser'), cmid, entry.get('available'), entry.get('crid'))
            )

        # Commit changes
        mydb.commit()

        return jsonify({'message': 'Movie and cast updated successfully'}), 200

    except Exception as e:
        
        return jsonify({'error': str(e)}), 500

    finally:
        # Ensure the database connection is closed
        if 'mydb' in locals():
            mydb.close()

    
@app.route('/moviecast/viewcastformovie', methods=["POST"], strict_slashes=False)
def viewcastformovie():
    mydb = connect()
    mycursor = mydb.cursor(dictionary=True)
    
    # Query to fetch all movies
    movie_query = "SELECT * FROM castformovie"
    mycursor.execute(movie_query)
    movies = mycursor.fetchall()
    
    # Fetch castrequired for each movie and add it as an array to the movie data
    for movie in movies:
        crid_query = "SELECT * FROM castrequired WHERE cmid = %s"
        mycursor.execute(crid_query, (movie['cmid'],))
        data= mycursor.fetchall()
        for k in data:
            crid_query = "SELECT * FROM castfileupload WHERE crid = %s"
            mycursor.execute(crid_query, (k['crid'],))
            d= mycursor.fetchall()
            k["castapplied"]=d
        movie['castrequired'] =data
    mydb.close()
    
    return json.dumps(movies)
@app.route('/moviecast/deletecastformovie', methods=["POST"], strict_slashes=False)
def deletecastformovie():
        r=request.json
        mydb = connect()
        mycursor = mydb.cursor()
        tx="delete from castformovie where cmid={0}".format(r['id'])
        mycursor.execute(tx)
        mydb.commit()
        mydb.close()
        return 's'
@app.route('/moviecast/insertcastrequired', methods=["POST"], strict_slashes=False)
def insertcastrequired():
    r=request.json
    mydb = connect()
    mycursor = mydb.cursor()
    tx = 'select crid from castrequired order by crid desc limit 1'
    mycursor.execute(tx)
    e = mycursor.fetchall()
    if len(e) == 0:
            eid = 1
    else:
            eid = e[0][0]+1
    d="insert into castrequired(crid,castname,role,totalnoofuser,cmid,status)values ('%s','%s','%s','%s','%s','%s')"%(eid,r['castname'],r['role'],r['totalnoofuser'],r['cmid'],r['status'])
    mycursor = mydb.cursor()
    mycursor.execute(d)
    mydb.commit()
    mydb.close()
    return 'e'
    
@app.route('/moviecast/updatecastrequired', methods=["POST"], strict_slashes=False)
def updatecastrequired():
    r=request.json
    mydb = connect()
    d="update castrequired set castname ='%s',role ='%s',totalnoofuser ='%s',cmid ='%s',status ='%s' where crid='%s'"%(r['castname'],r['role'],r['totalnoofuser'],r['cmid'],r['status'],r['crid'])
    mycursor = mydb.cursor()
    mycursor.execute(d)
    mydb.commit()
    mydb.close()
    return 's'
    
@app.route('/moviecast/viewcastrequired', methods=["POST"], strict_slashes=False)
def viewcastrequired():
        mydb = connect()
        mycursor = mydb.cursor()
        tx="select *   from castrequired"
        mycursor.execute(tx)
        e=mycursor.fetchall()
        mydb.close()
        return json.dumps(e)
@app.route('/moviecast/deletecastrequired', methods=["POST"], strict_slashes=False)
def deletecastrequired():
        r=request.json
        mydb = connect()
        mycursor = mydb.cursor()
        tx="delete from castrequired where crid={0}".format(r['id'])
        mycursor.execute(tx)
        mydb.commit()
        mydb.close()
        return 's'
@app.route('/moviecast/insertchatwithuser', methods=["POST"], strict_slashes=False)
def insertchatwithuser():
    r=request.json
    mydb = connect()
    mycursor = mydb.cursor()
    tx = 'select cuid from chatwithuser order by cuid desc limit 1'
    mycursor.execute(tx)
    e = mycursor.fetchall()
    if len(e) == 0:
            eid = 1
    else:
            eid = e[0][0]+1
    d="insert into chatwithuser(cuid,fromuser,touser,chat)values ('%s','%s','%s','%s')"%(eid,r['fromuser'],r['touser'],r['chat'])
    mycursor = mydb.cursor()
    mycursor.execute(d)
    mydb.commit()
    mydb.close()
    return 'e'
    
@app.route('/moviecast/updatechatwithuser', methods=["POST"], strict_slashes=False)
def updatechatwithuser():
    r=request.json
    mydb = connect()
    d="update chatwithuser set fromuser ='%s',touser ='%s',chat ='%s',messagedate ='%s' where cuid='%s'"%(r['fromuser'],r['touser'],r['chat'],r['messagedate'],r['cuid'])
    mycursor = mydb.cursor()
    mycursor.execute(d)
    mydb.commit()
    mydb.close()
    return 's'
    
@app.route('/moviecast/viewchatwithuser', methods=["POST"], strict_slashes=False)
def viewchatwithuser():
        mydb = connect()
        mycursor = mydb.cursor()
        tx="select *   from chatwithuser"
        mycursor.execute(tx)
        e=mycursor.fetchall()
        mydb.close()
        return json.dumps(e)

@app.route('/moviecast/chatcount', methods=["POST"], strict_slashes=False)
def chatcount():
        r=request.json
        mydb = connect()
        mycursor = mydb.cursor()
        tx="select count(*)   from chatwithuser where  touser='%s' and readed='unread'"%(r["id"])
        mycursor.execute(tx)
        e=mycursor.fetchone()[0]
        mydb.close()
        return json.dumps(e)
@app.route('/moviecast/viewchatwithuserid', methods=["POST"], strict_slashes=False)
def viewchatwithuserid():
        r=request.json
        mydb = connect()
        mycursor = mydb.cursor()
        tx="select *   from chatwithuser where (fromuser='%s' or touser='%s') and (fromuser='%s' or touser='%s')"%(r["fromid"],r["fromid"],r["id"],r["id"])
        mycursor.execute(tx)
        e=mycursor.fetchall()
        tx="update chatwithuser set readed='readed' where fromuser='%s'"%(r["id"])
        mycursor.execute(tx)
        mydb.commit()
        mydb.close()
        return json.dumps(e)
@app.route('/moviecast/deletechatwithuser', methods=["POST"], strict_slashes=False)
def deletechatwithuser():
        r=request.json
        mydb = connect()
        mycursor = mydb.cursor()
        tx="delete from chatwithuser where cuid={0}".format(r['id'])
        mycursor.execute(tx)
        mydb.commit()
        mydb.close()
        return 's'
@app.route('/moviecast/insertusersdetails', methods=["POST"], strict_slashes=False)
def insertusersdetails():
    
    try:
        # Fetch files
        profilepic_file = request.files['profilepic']
        videoname_file = request.files['videoname']

        # Secure filenames
        profilepic_filename = secure_filename(profilepic_file.filename)
        videoname_filename = secure_filename(videoname_file.filename)
         # Save files to upload folder
        profilepic_path = os.path.join(app.config['UPLOAD_FOLDER'], profilepic_filename)
        videoname_path = os.path.join(app.config['UPLOAD_FOLDER'], videoname_filename)
        profilepic_file.save(profilepic_path)
        videoname_file.save(videoname_path)
    except:
        profilepic_filename = ""
        videoname_filename = ""

   

    # Fetch JSON data
    r = request.form

    mydb = connect()
    mycursor = mydb.cursor()

    # Generate new user ID
    tx = 'select uid from usersdetails order by uid desc limit 1'
    mycursor.execute(tx)
    e = mycursor.fetchall()
    eid = 1 if len(e) == 0 else e[0][0] + 1

    # Insert data into database
    d = """
        INSERT INTO usersdetails(uid, name, mobile, email, role, profilepic, videoname,password,description)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    values = (
        eid,
        r['name'],
        r['mobile'],
        r['email'],
        r['role'],
        
        profilepic_filename,
        videoname_filename,
        r['password'],
        r["des"]
    )
    mycursor.execute(d, values)
    mydb.commit()
    mydb.close()

    return jsonify({"message": "User details inserted successfully"}), 200
    
@app.route('/moviecast/updateusersdetails', methods=["POST"], strict_slashes=False)
def updateusersdetails():
    r=request.json
    mydb = connect()
    d="update usersdetails set name ='%s',mobile ='%s',email ='%s',role ='%s',approved ='%s',profilepic ='%s',videoname ='%s' where uid='%s'"%(r['name'],r['mobile'],r['email'],r['role'],r['approved'],r['profilepic'],r['videoname'],r['uid'])
    mycursor = mydb.cursor()
    mycursor.execute(d)
    mydb.commit()
    mydb.close()
    return 's'

@app.route('/moviecast/approve', methods=["POST"], strict_slashes=False)
def approve():
    r=request.json
    mydb = connect()
    d="update usersdetails set approved ='%s' where uid='%s'"%(r['approve'],r['id'])
    mycursor = mydb.cursor()
    mycursor.execute(d)
    mydb.commit()
    mydb.close()
    return 's'
    
@app.route('/moviecast/viewusersdetails', methods=["POST"], strict_slashes=False)
def viewusersdetails():
        mydb = connect()
        mycursor = mydb.cursor()
        tx="select *   from usersdetails where role!='admin'"
        mycursor.execute(tx)
        e=mycursor.fetchall()
        mydb.close()
        return json.dumps(e)

@app.route('/moviecast/viewusersdetailsid', methods=["POST"], strict_slashes=False)
def viewusersdetailsid():
        r=request.json
        mydb = connect()
        mycursor = mydb.cursor()
        tx="select *   from usersdetails where uid!='%s' and approved=1"%(r["id"])
        mycursor.execute(tx)
        e=mycursor.fetchall()
        d=[]
        for x in e:
            x=list(x)
            tx="select count(*)   from chatwithuser where  fromuser='%s' and touser='%s' and readed='unread'"%(x[0],r["id"])
            mycursor.execute(tx)
            ex=mycursor.fetchone()[0]
            
            x.append(ex)
            d.append(x)
        mydb.close()
        return json.dumps(d)



@app.route('/moviecast/login', methods=["POST"], strict_slashes=False)
def login():
        r=request.json
        mydb = connect()
        mycursor = mydb.cursor(dictionary=True)
        tx="select *   from usersdetails where email='%s' and password='%s' and role='%s'"%(r["email"],r["password"],r["role"].lower())
        mycursor.execute(tx)
        e=mycursor.fetchone()
        mydb.close()
        return json.dumps(e)
@app.route('/moviecast/deleteusersdetails', methods=["POST"], strict_slashes=False)
def deleteusersdetails():
        r=request.json
        mydb = connect()
        mycursor = mydb.cursor()
        tx="delete from usersdetails where uid={0}".format(r['id'])
        mycursor.execute(tx)
        mydb.commit()
        mydb.close()
        return 's'

@app.route('/moviecast/insertliveaudition', methods=["POST"], strict_slashes=False)
def insertliveaudition():
    r=request.json
    mydb = connect()
    mycursor = mydb.cursor()
    tx = 'select lid from liveaudition order by lid desc limit 1'
    mycursor.execute(tx)
    e = mycursor.fetchall()
    if len(e) == 0:
            eid = 1
    else:
            eid = e[0][0]+1
    d="insert into liveaudition(lid,userid,crid,starttime,enddate,address)values ('%s','%s','%s','%s','%s','%s')"%(eid,r['userid'],r['crid'],r['starttime'],r['enddate'],r["address"])
    mycursor = mydb.cursor()
    mycursor.execute(d)
    mydb.commit()
    tx="select email from usersdetails where uid='%s'"%(r["userid"])
    mycursor.execute(tx)
    e=mycursor.fetchone()[0]
    sendemail(e,r['starttime'],r['enddate'],r["address"])
    mydb.close()
    return 'e'

def sendemail(r, startdate, enddate, address):
    import smtplib
    from email.mime.text import MIMEText
    from email.mime.multipart import MIMEMultipart
    try:
        # Email content
        msg_body = f"""Hi,
        Startdate - {startdate}
        Enddate - {enddate}
        Address - {address}
        """

        # Construct email subject
        subject = "Audition Details"

        # Construct email message
        msg = MIMEMultipart()
        msg['From'] = 'hariharanrniit@gmail.com'  # Use environment variable
        msg['To'] = r
        msg['Subject'] = subject
        msg.attach(MIMEText(msg_body, 'plain'))

        # Connect to SMTP server and send email
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.ehlo()
            server.starttls()
            server.login('hariharanrniit@gmail.com', 'lpxt pyzl jrfz kmzg')  # Securely use App Password
            server.sendmail('hariharanrniit@gmail.com', r, msg.as_string())
        print("Email sent successfully!")

    except Exception as e:
        print(f"Failed to send email: {e}")
    
@app.route('/moviecast/updateliveaudition', methods=["POST"], strict_slashes=False)
def updateliveaudition():
    r=request.json
    mydb = connect()
    d="update liveaudition set userid ='%s',crid ='%s',starttime ='%s',enddate ='%s',status ='%s' where lid='%s'"%(r['userid'],r['crid'],r['starttime'],r['enddate'],r['status'],r['lid'])
    mycursor = mydb.cursor()
    mycursor.execute(d)
    mydb.commit()
    mydb.close()
    return 's'

@app.route('/moviecast/acceptliveaudition', methods=["POST"], strict_slashes=False)
def acceptliveaudition():
    r=request.json
    mydb = connect()
    d="update liveaudition set status ='%s' where lid='%s'"%(r['status'],r['lid'])
    mycursor = mydb.cursor()
    mycursor.execute(d)
    mydb.commit()
    mydb.close()
    return 's'    
@app.route('/moviecast/changeliveaudition', methods=["POST"], strict_slashes=False)
def changeliveaudition():
    r=request.json
    mydb = connect()
    d="update liveaudition set starttime ='%s',enddate ='%s',status ='%s' where lid='%s'"%(r['starttime'],r['enddate'],r['status'],r['lid'])
    mycursor = mydb.cursor()
    mycursor.execute(d)
    mydb.commit()
    mydb.close()
    return 's'
    
@app.route('/moviecast/viewliveaudition', methods=["POST"], strict_slashes=False)
def viewliveaudition():
        r=request.json
        print(r)
        mydb = connect()
        mycursor = mydb.cursor()
        tx="select *   from liveaudition where userid='%s' and crid='%s'"%(r["userid"],r["cid"])
        print(tx)
        mycursor.execute(tx)
        e=mycursor.fetchall()
        mydb.close()
        return json.dumps(e)
@app.route('/moviecast/deleteliveaudition', methods=["POST"], strict_slashes=False)
def deleteliveaudition():
        r=request.json
        mydb = connect()
        mycursor = mydb.cursor()
        tx="delete from liveaudition where lid={0}".format(r['id'])
        mycursor.execute(tx)
        mydb.commit()
        mydb.close()
        return 's'
if __name__ == '__main__':
        app.run()
