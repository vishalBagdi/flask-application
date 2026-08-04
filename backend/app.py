from flask import Flask, render_template, jsonify
from connections import coll
import os

app = Flask(__name__)

PORT = os.environ.get('PORT', 8000)

@app.route('/')
def index():
    return jsonify({'message': 'backend is running'})

@app.route('/api/get')
def api():
    names = coll.find()

    result = []
    for name in names:
       result.append(name['value'])  # Append the 'value' field to the result list 
    result = {
        'data': result
    }    
    return jsonify(result)

@app.route('/api/add/<name>')
def add_name(name):
    coll.insert_one({'value': name})
    return jsonify({'message': f'Name {name} added successfully'})

if __name__ == '__main__':
    app.run(debug=True, port=PORT, host='0.0.0.0')





