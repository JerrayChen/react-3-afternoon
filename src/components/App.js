import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.getPost = this.getPost.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
    this.filterPost = this.filterPost.bind(this);
  }

  componentDidMount() {
    this.getPost();
  }

  getPost(){
    axios.get("https://practiceapi.devmountain.com/api/posts/").then(response => {
      console.log(response);
      this.setState({
        posts: response.data
      })
    }).catch(err => { console.log(err) })
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {"text": text}).then(response=>{
      this.setState({
        posts: response.data
      });
    })
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`).then(response=>{
      this.setState({
        posts: response.data
      });
    })
  }

  createPost(text) {
    axios.post("https://practiceapi.devmountain.com/api/posts/", {"text": text}).then(response=>{
      this.setState({
        posts: response.data
      });
    })
  }

  filterPost(text) {
    if(text===''){
      this.getPost();
    }else{
      axios.get(`https://practiceapi.devmountain.com/api/posts/filter?text=${text}`).then(response=>{
        this.setState({
          posts: response.data
        });
      })
    }
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header filterPostFn={this.filterPost}/>

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
          {this.state.posts.map((e, i) => {
            return (
              <Post
                key={i}
                text={e.text}
                date={e.date}
                updatePostFn={this.updatePost}
                id={e.id}
                deletePostFn={this.deletePost}
              />
            )
          })}

        </section>
      </div>
    );
  }
}

export default App;
