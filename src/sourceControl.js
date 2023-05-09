import fetch from 'cross-fetch';
var url = window.location.search
const urlParams = new URLSearchParams(url);
const code = urlParams.get('code')
import Blockly, { FieldLabelSerializable } from 'blockly';
import base64 from 'base-64';
import Swal from "sweetalert2";


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

function push() {
  console.log(hasRepoBeenSelected())
  if (!hasRepoBeenSelected()) return
  console.log("ya")
  var userDataString = localStorage.getItem("userData")
  var userData = JSON.parse(userDataString)
  var jsonData = Blockly.serialization.workspaces.save(Blockly.getMainWorkspace())
  var encodedContent = base64.encode(JSON.stringify(jsonData))
  var branch = ""
  var body = {
    message: 'Updated file via S4D',
    content: encodedContent
  }
  if (localStorage.getItem("branch")) {
    body.branch = localStorage.getItem("branch")
    branch = `&ref=${localStorage.getItem("branch")}`
  }
  // Get the SHA of the file
  fetch(`https://api.github.com/repos/${userData.login}/${localStorage.getItem("repo")}/contents/blocks.json?timestamp=${Date.now()}${branch}`, {
      headers: {
        Authorization: `token ${localStorage.getItem("accessToken")}`
      }
    })
    .then(response => response.json())
    .then(fileData => {
      const sha = fileData.sha;
      console.log(fileData)
      if (fileData.url) body.sha = sha
      fetch(`https://api.github.com/repos/${userData.login}/${localStorage.getItem("repo")}/contents/blocks.json?timestamp=${Date.now()}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${localStorage.getItem("accessToken")}`
          },
          body: JSON.stringify(body)
        })
        .then(response => {
          if (response.ok) {
            console.log('File updated successfully.');
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: "File updated successfully."
            })
          } else {
            response.json().then(resJson => {
              console.log(resJson)
              console.log(resJson.message)
              Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: resJson.message
              })
            })
          }
        })
        .catch(error => console.log(error));
    });
}


function pull() {
  console.log("ya")
  if (!hasRepoBeenSelected()) return
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
      var jsonWorkspace = JSON.parse(json)
      Blockly.getMainWorkspace().clear()
      Blockly.serialization.workspaces.load(jsonWorkspace, Blockly.getMainWorkspace())
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

function selectBranch() {
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
