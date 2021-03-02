var main = document.getElementById('mainList')
var inputValue = document.getElementById('inp')



firebase.database().ref('todos').on('child_added',(data) => {
    
    var finalText = document.createTextNode(data.val().value)

    var list = document.createElement('p')
    list.setAttribute('class', 'list')
    list.appendChild(finalText)
    main.appendChild(list)


    var btnDiv = document.createElement('div')
    var btn = document.createElement('button')
    btn.setAttribute('class', 'btn')
    btn.setAttribute('onClick', 'deleteTodo(this)')
    btn.setAttribute('id',data.val().key)
    var btnText = 'Delete'
    var finalbtnText = document.createTextNode(btnText)
    btn.appendChild(finalbtnText)



    var editBtn = document.createElement('button')
    editBtn.setAttribute('class', 'btn')
    editBtn.setAttribute('onClick', 'edit(this)')
    editBtn.setAttribute('id',data.val().key)
    var editbtnText = 'Edit'
    var finaleditbtnText = document.createTextNode(editbtnText)
    editBtn.appendChild(finaleditbtnText)



    btnDiv.appendChild(btn)
    btnDiv.appendChild(editBtn)
    list.appendChild(btnDiv)
})


function add() {
    

    var db = firebase.database().ref('todos');
    var key = db.push().key;

    var todo = {
        value: inputValue.value,
        key: key
    };

    db.child(key).set(todo);
    


   


    inputValue.value = ''

}

function deleteTodo(e) {
    firebase.database().ref('todos').child(e.id).remove();
    var li = e.parentNode.parentNode
    li.remove()
}

function edit(e) {
    var li = e.parentNode.parentNode
    var editText = prompt('Enter Edit text')
    var dEdit = {
        value: editText,
        key: e.id
    };
    firebase.database().ref('todos').child(e.id).set(dEdit);
    li.firstChild.nodeValue = editText
   
}
function deleteAll() {
    firebase.database().ref('todos').remove();
    main.innerHTML = ''
}
