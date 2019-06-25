import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Request from './services/Request'

class App extends Component {

  constructor(props) {
    super(props)
    this.changeFile = this.changeFile.bind(this)
    this.submit = this.submit.bind(this)
    this.request = new Request()
  }

  state = {
    file: "",
    targetFile: "",
    message: "",
    showImage: false,
    reader:""
  }

  changeFile = (event) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    this.setState({ file: event.target.value, targetFile: event.target.files[0], reader:reader, showImage:false, message:"" })
  }

  submit = () => {
    this.request.uploadFile(this.state.targetFile).then(response => {
      this.reponseJson(response.json())
      this.setState({ showImage: true })
    }).catch(error => {
      this.reponseJson(error.json())
      this.setState({ showImage: false })
    })
  }

  reponseJson = (response) => {
    response.then(result => {
      this.setState({ message: result.message })
    })
  }

  imageShow = () => {
    return (
      <div>
        <img src={this.state.reader.result} style={{ width: 400 }} alt="Imagem" />
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Bem vindo!</h2>
        </div>
        <p className="App-intro">
          <input type="file" name="file" value={this.state.file} onChange={this.changeFile} />
        </p>
        <input type="button" onClick={this.submit} value="Enviar arquivo" />
        <p className="App-intro">
          {this.state.message}
        </p>
        {this.state.showImage && (this.imageShow())}
      </div>
    );
  }
}

export default App;
