var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    todo = new schema({
    	user_id : String,
    	content : String,
    	update_date : Date
    });

mongoose.model('Todo', todo);
mongoose.connect('mongodb://localhost/my-express1-todo');
