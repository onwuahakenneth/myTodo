

let inputElem = document.querySelector('.input');
let addButton = document.querySelector('.addBtn');
let searchButton = document.querySelector('.searchBtn');
let searchInput = document.querySelector('.search')
let topContainer = document.querySelector('.top-container')
let listContainer = document.querySelector('.list-container')
let searchContainer = document.querySelector('.search-container')
let saveButton = document.querySelector('.saveBtn');
let closeButton = document.querySelector('.closeBtn');
let recordElem = document.querySelector('.displayRecord')
let todoRecord = [];




//EventHandlers
searchButton.addEventListener('click', searchRecord);
addButton.addEventListener('click', addItem);


function addItem(){
    const item = inputElem.value.trim();
    if(item.length == 0){
        alert('Please, enter a valid text...')
    }else {
        let divElem = document.createElement('div');
        let inputEle = document.createElement('input');
        let edit = document.createElement('button');
        let remove = document.createElement('button');

        
        //Add classes for css styling
        divElem.classList.add('inputDiv');
        inputEle.classList.add('inputItem');
        edit.classList.add('edit');
        remove.classList.add('remove');
        
        edit.textContent = 'Edit';
        remove.textContent = 'Remove';
        inputEle.value = item;
        divElem.append(inputEle);
        divElem.append(edit);
        divElem.append(remove);
        
        listContainer.append(divElem);
        
        
        
        edit.addEventListener('click', editItem);
        remove.addEventListener('click', removeItem);
        
        
        function editItem(){
            inputEle.classList.toggle('editItem');
            inputEle.focus();
            
            inputEle.onblur = ()=>{
                inputEle.classList.toggle('editItem')
            }
        }

        function removeItem(){
            let answer = confirm('Remove this item? ');
            if(answer){
                divElem.remove();
            }
        }



       
    }
    

    inputElem.value = '';
}








saveButton.addEventListener('click', updateStorage);

function updateStorage(){
    let itemArr = document.querySelectorAll('.list-container .inputDiv .inputItem');
    let editArr = document.querySelectorAll('.list-container .inputDiv .edit');
    let removeArr = document.querySelectorAll('.list-container .inputDiv .remove');
    let items = [];
    let obj1 = {};
    itemArr.forEach(e=>{
        items.push(e.value);

    })
    if(items.length !==0){

        let record = JSON.parse(localStorage.getItem('todoLog'));
        console.log(record)
        let name = prompt('Enter A Title for your List');
        obj1.title = name;
        obj1.content = items;
        if(name.trim().length !== 0){

            if(record == null){
                localStorage.setItem('todoLog', JSON.stringify([obj1]));
                itemArr.forEach(item=>{
                    item.remove()
                    })
                    editArr.forEach(item=>{
                        item.remove()
                   })
                   removeArr.forEach(item=>{
                     item.remove()
                   })
                
            }
            else{
                let add = true;
                record.forEach(obj=>{
                    if(obj.title == name){
                        add = false;
                        alert(`The name '${name}' already exist`)
                    }
                })
                    if(add){

                         record.push(obj1)
                         localStorage.setItem('todoLog', JSON.stringify(record))
                            
                            
                         itemArr.forEach(item=>{
                         item.remove()
                         })
                         editArr.forEach(item=>{
                             item.remove()
                        })
                        removeArr.forEach(item=>{
                          item.remove()
                        })
                    }
                    



               

                
            }
           

        }else{
            alert('Enter A Valid Title...')
        }
        
    }
}





function searchRecord(){
    let found = false;
    let foundIndex = -1;
    let searchName = searchInput.value;
    let record = JSON.parse(localStorage.getItem('todoLog'));
    searchName = searchName.trim()
    if(searchName.length !== 0 && record !== null){
        record.forEach((e, index)=>{
            if(e.title == searchName){
                found = true;
                foundIndex = index;
            }
        })
        if(found){
    
            topContainer.classList.toggle('hide')
            listContainer.classList.toggle('hide')
            saveButton.classList.toggle('hide')
            closeButton.classList.toggle('show')
            searchContainer.classList.toggle('hide');
            
            record[foundIndex]['content'].forEach(k=>{
                let div = document.createElement('div');
                div.classList.toggle('ouputDiv');
                div.innerHTML = k;
                recordElem.append(div);
            })
        }else {
            alert(`No record found for '${searchName}'`)
        }

    }else{
        alert(`You've not saved any LIST...`)
    }
    searchInput.value = '';
}


closeButton.addEventListener('click', ()=>{
    topContainer.classList.toggle('hide')
    listContainer.classList.toggle('hide')
    saveButton.classList.toggle('hide')
    closeButton.classList.toggle('show')
    searchContainer.classList.toggle('hide');

    let divElems = document.querySelectorAll('.displayRecord div');
    console.log(divElems)
    divElems.forEach(el=>{
        el.remove()
    })
})