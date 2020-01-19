import React, { Component } from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';
import { Route, Prompt} from 'react-router-dom';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
    state = {
        posts: [],
        allowNavigation: true,
    }

    componentDidMount () {
        console.log(this.props);
        // this.props.history.block(() => {
        //     debugger
        //     if(this.state.allowNavigation){
        //         return "Are you sure beta??";
        //     }
        // });
        axios.get( '/posts' )
            .then( response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                });
                this.setState({posts: updatedPosts});
                // console.log( response );
            } )
            .catch(error => {
                console.log(error);
                //this.setState({error: true});
            });
    }

    postSelectedHandler = (id) => {
        this.setState({
            selectedPostId: id,
            allowNavigation: false},()=>{
                debugger
                this.props.history.push("/posts/"+id);
            });
    }

    render(){
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                <Post  
                    title={post.title} 
                    author={post.author}
                    key={post.id}
                clicked={() => this.postSelectedHandler(post.id)} />
                );
            });
        }
        return (
            <div>
            <section className="Posts">
                {posts}
            </section>
                <Prompt when={false} message={location =>
                    location.pathname.startsWith("/app")
                        ? true
                        : `Are you sure you want to go to ${location.pathname}?`
                }
/>
            <Route path={this.props.match.url + '/:id'} exact component={FullPost}></Route>
            </div>
        );
    }
}

export default Posts;