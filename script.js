let saveBlogbut = document.getElementById('saveBlogbut');
let text1 = document.getElementById('exampleFormControlInput1');
let text2 = document.getElementById('exampleFormControlTextarea1')
let postbody = document.getElementById("postbody");
let editmodal = document.getElementById('exampleModal2');

let dataArr = [];
function datetimerformatter(data) {
    const arr = data.split(",");
    const time = arr[1].split(":");
    if (parseInt(time[0]) >= 12) {
        const tval = parseInt(time[0]) == 12 ? "12" : time[0] % 12
        return arr[0] + "  at " + tval + ":" + time[1] + " PM";
    }
    else {
        return arr[0] + "  at " + time[0] + ":" + time[1] + " AM";
    }
}


function deletedata(id) {

    dataArr = dataArr.filter((item, ind) => {
        return item.id != id;
    })

    postbody.innerHTML = dataArr.map((item, ind) => {
        return (` <div class="row me-4 ms-4 my-4 p-3 border border-dark " >
        <div class="heading my-2">
          <h1>${item.heading}</h1>
        </div>

        <div class="contents">
        ${item.post}
        </div>

        <div class="dateshower">
            <div class="my-4">
                <button type="button" id=${item.id} onclick=editdata(this.id) class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                     Edit Post
                 </button>
                   <button type="button" id=${item.id} onclick=deletedata(this.id) class="btn btn-dark">Delete Post</button>
                 </div>
        
        
                  <div >
                  ${item.text}: ${datetimerformatter(new Date().toLocaleString())}
                 </div>
        
        </div>
        </div> `)
    }).join("")

    console.log(dataArr)
}

function editsavepost(data1, data2, id) {

    console.log(data1, data2, id)
    const data = { id: id, heading: data1, post: data2, text: "Last Updated At" }
    dataArr = dataArr.map((item, ind) => {
        if (item.id == id) {
            return data;
        }
        else {
            return item;
        }
    })

    postbody.innerHTML = dataArr.map((item, ind) => {
        return (` <div class="row me-4 ms-4 my-4 p-3 border border-dark " >
        <div class="heading my-2">
          <h1>${item.heading}</h1>
        </div>

        <div class="contents">
        ${item.post}
        </div>

        <div class="dateshower">
            <div class="my-4">
                <button type="button" id=${item.id} onclick=editdata(this.id) class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                     Edit Post
                 </button>
                   <button type="button" id=${item.id} onclick=deletedata(this.id) class="btn btn-dark">Delete Post</button>
                 </div>
        
        
                  <div >
                 ${item.text}: ${datetimerformatter(new Date().toLocaleString())}
                 </div>
        
        </div>
        </div> `)
    }).join("")
    console.log(dataArr)

}

function editdata(id) {
    const data = dataArr.filter((item, ind) => {
        return item.id == id
    })



    editmodal.innerHTML = `<div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Edit a new post</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
          <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"></label>
              <input type="text" class="form-control form-control-lg" id="exampleFormControlInputedit1" placeholder="Enter Your Heading" value=${data[0].heading} >
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label"></label>
              <textarea class="form-control form-control-lg" id="exampleFormControlTextareaedit2" rows="3" placeholder="Enter Your Blog Post">${data[0].post}</textarea>
            </div>
      </div>
      <div class="modal-footer">
       
        <button type="button" id="saveBlogbut" onclick=editsavepost(document.getElementById('exampleFormControlInputedit1').value,document.getElementById('exampleFormControlTextareaedit2').value,${id}) data-bs-dismiss="modal" class="btn btn-dark">Save Post</button>
        <button type="button" class="btn btn-dark" onclick=deletedata(id) data-bs-dismiss="modal">Delete Post</button>
      </div>
    </div>
    </div> `

}



saveBlogbut.addEventListener("click", function () {

    const data = { id: dataArr.length + 1, heading: text1.value, post: text2.value, text: "Created At" }

    dataArr.push(data)

    postbody.innerHTML = dataArr.map((item, ind) => {
        return (`  <div class="row me-4 ms-4 my-4 p-3 border border-dark " >
        <div class="heading my-2">
          <h1>${item.heading}</h1>
        </div>

        <div class="contents">
        ${item.post}
        </div>

        <div class="dateshower">
            <div class="my-4">
                <button type="button" id=${item.id} onclick=editdata(this.id) class="btn btn-dark  my-2" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                     Edit Post
                 </button>
                   <button type="button" id=${item.id} onclick=deletedata(this.id) class="btn btn-dark my-2">Delete Post</button>
                 </div>
        
        
                  <div >
                  ${item.text}: ${datetimerformatter(new Date().toLocaleString())}
                 </div>
        
        </div>
        </div>
        
        `)
    }).join("")



})




