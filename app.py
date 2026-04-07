from flask import Flask, request, jsonify, render_template
import mysql.connector

app = Flask(__name__)

# MySQL connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="0507",
    database="decision_db"
)

# Home page
@app.route("/")
def home():
    return render_template("index.html")

# History page
@app.route("/history-page")
def history_page():
    return render_template("history.html")

# Save data
@app.route("/save", methods=["POST"])
def save():
    data = request.json
    decision = data["decision"]
    confidence = data["confidence"]

    cursor = db.cursor()
    cursor.execute(
        "INSERT INTO history (decision, confidence) VALUES (%s, %s)",
        (decision, confidence)
    )
    db.commit()

    return jsonify({"message": "saved"})

# Get history
@app.route("/history")
def history():
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM history ORDER BY id DESC")
    return jsonify(cursor.fetchall())

# Delete
@app.route("/delete/<int:id>", methods=["DELETE"])
def delete(id):
    cursor = db.cursor()
    cursor.execute("DELETE FROM history WHERE id=%s", (id,))
    db.commit()
    return jsonify({"message": "deleted"})

if __name__ == "__main__":
    app.run(debug=True)