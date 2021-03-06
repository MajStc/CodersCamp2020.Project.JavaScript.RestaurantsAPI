//Setup for one page
const state = {
    //Elements on page
    'pageSize': 3,
    //On which page it starts
    'pageNumber': 1
}

const resetState = ()=>{
    state.pageSize = 3;
    state.pageNumber = 1;
}

//Generate slice of the array that we wanna display (depends on setup in state object)
const paginate = (obj, pageSize, pageNumber) => {   
    let current = (pageNumber-1)*pageSize;
    let endData = current + pageSize;
    return obj.slice(current, endData);
}

//Generate buttons depending on which page we are
const generatePage = (arr,btnContainer) => {
    const maxPage = Math.ceil(arr.length/state.pageSize);

    if(arr.length <= state.pageSize){
        //Delete buttons and back to the first page when elements are less or equal of max elements per page
        btnContainer.innerHTML = '';
        state.pageNumber = 1;
    }else{
        btnContainer.innerHTML = (state.pageNumber === 1 ) ? `<button id='btn2'>Next page</button>` :
                            (state.pageNumber === maxPage ) ? `<button id='btn1'>Previous page</button>` :
                            `<button id='btn1'>Previous page</button> <button id='btn2'>Next page</button>`;
    }
}

//Update DOM by appending current data
const appendData = (result, arr, btnContainer, dataContainer)=>{
    generatePage(arr, btnContainer);
    dataContainer.innerHTML = result.join(" ");
}

//Default data when reloading the site - envoke this in filter/search function as a setup
const append = (arr, btnContainer, dataContainer)=>{
appendData(paginate(arr, state.pageSize, state.pageNumber), arr, btnContainer, dataContainer);
}

//Switch pages events
const generateBtn = (e)=>{
    if(e.target && e.target.id== 'btn2'){
        state.pageNumber += 1;
    }else if(e.target && e.target.id == 'btn1'){
        state.pageNumber -= 1;
    }
}

module.exports = {
    generateBtn,
    append,
    resetState
}