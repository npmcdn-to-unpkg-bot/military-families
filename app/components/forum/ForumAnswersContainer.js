import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import * as actions from './forumAction';

class ForumAnswersContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answers: [],
            question: {}
        };
          this.replyEventhandleSubmit = this.replyEventhandleSubmit.bind(this);
    }


    postAnswerMount(answer) {
      const forumId = this.props.routeParams.forumId;
       actions.postAnswers(forumId, answers).then(response => {
           const answers = this.state.answers.concat([response]);
           this.setState({answers});
       });
    }

    componentDidMount() {
        const forumId = this.props.routeParams.forumId;
        actions.getQuestion(forumId).then(response => {
            this.setState({question: response});
        });
        actions.getAnswers(forumId).then(response => {
            this.setState({answers: response});
        });

    }

    replyEventhandleSubmit(event){
      event.preventDefault();
      const replySubmit = {
        userAnswers:this.refs.answers.value
      }
      this.props.postAnswerMount(replySubmit);
    }

    render() {
        return <div className="container" id="forum-answers-page">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3>Question goes here: {this.state.question.question}</h3>
                    <p>Description goes here: {this.state.question.description}</p>
                    <button type="button" className="btn btn-primary forum-btn" data-toggle="modal" data-target="#questionModalButton">Reply</button>
                    <Link to="/forum"><button type="button" className="btn btn-default forum-btn">Back</button></Link>
                </div>
                <ul className="list-group">
                    {this.state.answers.map((answer, index) => <li className="list-group-item" key={index}>
                        <p>{answer.userAnswers}</p>
                        <p><i>Posted on {answer.date}</i></p>
                    </li>)}
                </ul>
            </div>
            <div className="modal fade" id="Modal" role="dialog" aria-labelledby="exampleModal" id="questionModalButton">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title" id="exampleModalLabel">Reply: {this.state.question.question} </h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal" onSubmit={this.replyEventhandleSubmit}>
                                <div className="form-group">
                                    <label className="control-label"></label>
                                    <textarea className="form-control" id="recipient-text" ref="userAnswers" rows="5"></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                                <button type="button" className="btn btn-default form-horizontal" data-dismiss="modal">Close</button>
                            </form>
                        </div>
                        <div className="modal-footer"></div>
                    </div>
                </div>
            </div>
        </div>
    }
}

ForumAnswersContainer.propTypes = {};

export default ForumAnswersContainer;
