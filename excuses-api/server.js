const express = require("express"); 
const app = express(); 
const PORT = 3000; 

app.use(express.json());   // middleware: unwrap JSON bodies

let excuses = [ 
    {id: 1, text: "My cat sat on my keyboard and deleted the file."}, 
    {id: 2, text: "Github was down. (It wasn't)" }, 
    {id: 3, text: "I pushed to the wrong branch and it vanished" }, 
]; 

let nextId=4 ;          //persistent counter, not derived from .length

app.get("/", (req, res) => { 
    res.json({ message: "Welcome to the Late Homework Excuses API"}); 
});

app.get("/api/excuses" , (req,res)=> { 
    res.json(excuses);
}); 

app.post("/api/excuses" , (req,res) => { 
    const {text} = req.body;        //read from the unwrapped body

    if (!text || text.trim() === ""){ // Validate before storing
        return res.status(400).json({error: "`text` is required and cannot be empty."
        });
    }

    const newExcuse = {id: nextId, text: text.trim()}; 
    nextId++; 
    excuses.push(newExcuse); 
    res.status(201).json(newExcuse); // 201 = "Created"
}); 

app.listen(PORT, ()=> { 
    console.log(`Server running at http://localhost:${PORT}`);
});
