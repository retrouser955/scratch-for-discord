import fetch from 'cross-fetch';
var url = window.location.search
const urlParams = new URLSearchParams(url);
const code = urlParams.get('code')
import Blockly, { FieldLabelSerializable } from 'blockly';
import base64 from 'base-64';
import Swal from "sweetalert2";
import {generateMainFileContent, generateCommandContent} from "./helpers/ExportFiles"
import { loadFilesFromLocal } from './helpers/FileTools';

if (code) {
  var changeUrl = new URL(document.location.href);
  changeUrl.searchParams.delete('code');
  window.history.replaceState({}, document.title, changeUrl);
  const body = {
    "code": code
  }
if (window.location.hostname == 'scratch-for-discord-nine.vercel.app') {
  body.redirectUri = "https://scratch-for-discord-nine.vercel.app/"
}
  fetch('https://s4d-api.xl83.dev/api/v1/user/githubsc/', {
    method: 'POST',
    mode: "no-cors",
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      "Accept": 'application/json'
    }
  }).then(res => {
    res.json().then(res => {
      var code = res.code
      if (code) {
        localStorage.setItem("accessToken", res.code)
        localStorage.setItem("isTokenValid", "true")
        // updateGitUi("show")
        fetch('https://api.github.com/user', {
            headers: {
              Authorization: `token ${localStorage.getItem("accessToken")}`
            }
          })
          .then(res => res.json())
          .then(json => {
            console.log(json)
            localStorage.setItem("userData", JSON.stringify(json))
          })
      } else {
        alert("There was a error, please refresh and try login again")
        console.log(res)
      }
    })
  })

} else {
  console.log("no code")
  if (localStorage.getItem("accessToken")) {
    fetch('https://api.github.com/user/repos', {
        headers: {
          Authorization: `token ${localStorage.getItem("accessToken")}`
        }
      })
      .then(res => res.json())
      .then(json => {
        if (json.message == "Bad credentials") {
          localStorage.setItem("isTokenValid", "false")
          //updateGitUi("hide")
        } else {
          //updateGitUi("show")
        }
      });
  }
}

//function updateGitUi(type) {
//  if (type == "show") {
//  thing
//} else {
// thing
//  }
//}

async function push() {
  if (!hasRepoBeenSelected()) return
  if (!hasBranchBeenSelected()) return
  var commands = generateCommandContent()
  var userDataString = localStorage.getItem("userData")
  var userData = JSON.parse(userDataString)
  var main = generateMainFileContent()
  var blocks = localStorage.getItem("workspace")
  var branch = localStorage.getItem("branch");
  var accessToken = localStorage.getItem("accessToken")
  var tree = [
  {
    path: `index.js`,
    mode: '100644',
    type: 'blob',
    content: main
  },
  {
    path: `blocks.json`,
    mode: '100644',
    type: 'blob',
    content: blocks
  }
  ]
  Object.entries(commands).forEach(([key, value]) => {
    var obj = {
        path: `commands/${key}.js`,
        mode: '100644',
        type: 'blob',
        content: value
    }
    tree.push(obj)
  });
  const response1 = await fetch(`https://api.github.com/repos/${userData.login}/${localStorage.getItem("repo")}/git/trees`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`
  },
  body: JSON.stringify({
    "tree": tree,
    "repo": localStorage.getItem("repo"),
    "owner": userData.login
  })
});
const data1 = await response1.json();
console.log(data1)
const newTreeSha = data1.sha;
const response2 = await fetch(`https://api.github.com/repos/${userData.login}/${localStorage.getItem("repo")}/branches/${branch}`);
const data2 = await response2.json();
console.log(data2)
const parentCommitSha = data2.commit.sha;

const response3 = await fetch(`https://api.github.com/repos/${userData.login}/${localStorage.getItem("repo")}/git/commits`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`
  },
  body: JSON.stringify({
    message: "Updated via S4D",
    tree: newTreeSha,
    parents: [parentCommitSha]
  })
});

const data3 = await response3.json();
console.log(data3)
const newCommitSha = data3.sha;

const response4 = await fetch(`https://api.github.com/repos/${userData.login}/${localStorage.getItem("repo")}/git/refs/heads/${branch}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`
  },
  body: JSON.stringify({
    sha: newCommitSha,
    force: false
  })
});

if (response4.status === 200) {
  console.log('Folder updated successfully!');
  Swal.fire({
    icon: 'success',
    title: 'Success!',
    text: "Successfully updated files!"
  })
} else {
  console.log('Failed to update the folder.');
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: "Failed to update the folder"
  })
}
}


function pull() {
  console.log("ya")
  if (!hasRepoBeenSelected()) return
  if (!hasBranchBeenSelected()) return
  var userDataString = localStorage.getItem("userData")
  console.log(userDataString)
  var userData = JSON.parse(userDataString)
  var branch = ""
  if (localStorage.getItem("branch")) {
    branch = `&ref=${localStorage.getItem("branch")}`
  }
  fetch(`https://api.github.com/repos/${userData.login}/${localStorage.getItem("repo")}/contents/blocks.json?timestamp=${Date.now()}${branch}`, {
      headers: {
        Authorization: `token ${localStorage.getItem("accessToken")}`
      }
    }).then(res => res.json())
    .then(json => {
      console.log(json)
      if (json.message) {
        if (json.message == "Not Found") {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            html: "<p>blocks.json not found in Repo.</p></br> <p>Please make sure you have selected the right Repo or push to create the file.</p>"
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: json.message
          })
        }
        return
      }
      var json = base64.decode(json.content)
      localStorage.setItem("workspace", json)
      loadFilesFromLocal()
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: "Successfully loaded files!"
      })
      
    })
}

function selectRepo() {
  var selectRepo = {}
  fetch('https://api.github.com/user/repos', {
      headers: {
        Authorization: `token ${localStorage.getItem("accessToken")}`
      }
    })
    .then(res => res.json())
    .then(json => {
      console.log(json)
      json.forEach((ele) => {
        var name = ele.name
        console.log(name)
        var newObj = {
          [name]: ele.name
        }
        Object.assign(selectRepo, newObj)
      });
      Swal.fire({
        title: "Repo Selection",
        input: 'select',
        inputOptions: selectRepo,
        inputPlaceholder: 'Select a Option',
        showCancelButton: true,
      }).then(async (result) => {
        if (!result.value) return
        localStorage.setItem("repo", result.value)
        window.dispatchEvent( new Event('storage') )
        Swal.fire({
          title: `Succesfully Selected ${result.value}!`,
        })
      })
    })
}

function oauth() {
  if (window.location.hostname == 'scratch-for-discord-nine.vercel.app') {
    window.location = "https://github.com/login/oauth/authorize?scope=repo&client_id=bf929a64f389bd8aa375"
  } else {
    window.location = "https://github.com/login/oauth/authorize?scope=repo&client_id=b6d2e4d50218cbda081b"
  }
}

function hasRepoBeenSelected() {
  console.log("ran")
  if (!localStorage.getItem("repo")) {
    console.log("no repo")
    Swal.fire({
      icon: 'error',
      title: 'Error',
      html: "Please select a repo."
    })
    return false
  }
  return true
}

function hasBranchBeenSelected() {
  console.log("ran")
  if (!localStorage.getItem("branch")) {
    console.log("no repo")
    Swal.fire({
      icon: 'error',
      title: 'Error',
      html: "Please select a branch."
    })
    return false
  }
  return true
}

function selectBranch() {
  if (!hasRepoBeenSelected()) return
  var selectBranch = {}
  var userDataString = localStorage.getItem("userData")
  var userData = JSON.parse(userDataString)
  fetch(`https://api.github.com/repos/${userData.login}/${localStorage.getItem("repo")}/branches`, {
      headers: {
        Authorization: `token ${localStorage.getItem("accessToken")}`
      }
    })
    .then(res => res.json())
    .then(json => {
      console.log(json)
      json.forEach((ele) => {
        var name = ele.name
        console.log(name)
        var newObj = {
          [name]: ele.name
        }
        Object.assign(selectBranch, newObj)
      });
      Swal.fire({
        title: "Branch Selection",
        input: 'select',
        inputOptions: selectBranch,
        inputPlaceholder: 'Select a Option',
        showCancelButton: true,
      }).then(async (result) => {
        if (!result.value) return
        localStorage.setItem("branch", result.value)
        window.dispatchEvent( new Event('storage') )
        Swal.fire({
          title: `Succesfully Selected ${result.value}!`,
        })
      })
    })
}

export {
  push,
  pull,
  selectRepo,
  oauth,
  selectBranch
}
