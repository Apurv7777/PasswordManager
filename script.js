// logic to fill the table

function maskPassword(pass) { 
    let str = ""
    for(let i=0;i<pass.length;i++) {
        str += "*"
    }
    return str
}

function copyText(txt) {
    navigator.clipboard.writeText(txt).then (
        () => {
            alert("Copied !") ;
        } ,
        () => {
            alert("Failed to Copy !")
        },
    );
}

const deletePasswords = (website) => {
    let data = localStorage.getItem("passwords")
    let arr = JSON.parse(data);
    arrUpdated = arr.filter((e) => {
        return e.website != website
    })
    localStorage.setItem("passwords",JSON.stringify(arrUpdated))
    alert(`Successfully Deleted ${website}'s password .`)
    showPasswords();
}


const showPasswords = () => {
let tb = document.querySelector("table")
let data = localStorage.getItem("passwords")
if(data==null || JSON.parse(data).length == 0){
    tb.innerHTML = `<h2>No Saved Passwords !</h2>`
} else {
    tb.innerHTML = `<thead>
    <th>Website</th>
    <th>Username</th>
    <th>Password</th>
    <th>Delete</th>
</thead>`
    let arr = JSON.parse(data);
    let str = ""
    for(let i=0;i<arr.length;i++){
        const ele = arr[i];
        str += `<tr>
            <td>${ele.website} <img onClick="copyText('${ele.website}')" src="./copy.svg" alt="Copy Button" width="100" height="40" /></td>
            <td>${ele.username} <img onClick="copyText('${ele.username}')" src="./copy.svg" alt="Copy Button" width="100" height="40" /></td>
            <td id="pw">${maskPassword(ele.pwd)} <img onClick="copyText('${ele.pwd}')" src="copy.svg" alt="Copy Button" width="100" height="40" /></td>
            <td><div onClick=deletePasswords('${ele.website}')><img src="./delete.svg" alt="Delete Button" width="100" height="40"></div></td>
            </tr>`
        }
        tb.innerHTML += str
    }
    website.value = ""
    username.value = ""
    pwd.value = ""
}

showPasswords();
const btn = document.querySelector(".btn")

btn.addEventListener("click",(e) => {
    e.preventDefault();
    let passwords = localStorage.getItem("passwords")
    if(passwords == null){
        let json = []
        // let tb = document.querySelector("table")
        // tb.innerHTML = `<h2>No Saved Passwords !</h2>`
        json.push({website:null,username:null,pwd:null})
        alert("Password Saved!")
        localStorage.setItem("passwords",JSON.stringify(json))
    } else {
        let json = JSON.parse(localStorage.getItem("passwords"))
        json.push({website:website.value,username:username.value,pwd:pwd.value})
        alert("Saved Succesfully !")
        localStorage.setItem("passwords",JSON.stringify(json))
    }
    showPasswords();
})

