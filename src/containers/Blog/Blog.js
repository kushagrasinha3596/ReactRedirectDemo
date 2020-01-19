import React, { Component } from 'react';
// import axios from 'axios';
import './Blog.css';
import Posts from './Posts/Posts';
import { Route, NavLink, Switch, Redirect} from 'react-router-dom';
import asyncComponents from '../../hoc/asyncComponents';

const AsyncComponent = asyncComponents(() => {
    return import('./NewPost/NewPost');
});

// const AsyncNewPost = React.lazy(() => {
//     debugger
//     import('./NewPost/NewPost');
// });

class Blog extends Component {

    state= {
        auth: true
    }

    componentDidMount(){
        // this.props.history.listen(() => {
        //     console.log("Route has changed");
        // });
    }

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink exact to="/posts/">Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: "/new-post",
                                hash: "#submit",
                                search: "?qu lick-submit=true"
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                {this.state.auth ? <Route path="/new-post" component={AsyncComponent}/>:null }
                <Route path="/posts/" component={Posts}/>
                <Redirect from="/new-post" to="/posts/"/>
                <Route render={() => <h1>Not Found</h1>}/>
                </Switch>
            </div>
        );
    }
}

export default Blog;