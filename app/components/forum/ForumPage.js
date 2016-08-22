import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

class ForumPage extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const modelquestion = {
            question: this.refs.question.value
        };
        const modeldescription = {
            description: this.refs.description.value
        };
        this.props.postQuestion(modelQ, modelD);
    }

    render() {
        return <div>
            <div className="container">
                <div className="page-header page-heading">
                    <div className="clearfix"></div>
                    <h1>Forum</h1>
                </div>

                <p className="lead">This is the right place to discuss any ideas, critics, feature requests and all the ideas regarding our website. Please follow the forum rules and always check FAQ before posting to prevent duplicate posts.</p>

                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#questionModalButton" data-whatever="@mdo">Open modal for @mdo</button>

                <table className="table forum table-striped">
                    <thead>
                        <tr>
                            <th>Topics</th>
                            <th>Posts</th>
                            <th>Last Post</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.questions.map(question => <tr key={question.id}>
                            <td>
                                <Link to={`forum/${question.id}`}>{question.question}</Link>
                            </td>
                            <td>{question.description}</td>
                            <td>{question.presentDate}</td>
                        </tr>)
}
                    </tbody>
                </table>

                <div className="modal fade" id="Modal" role="dialog" aria-labelledby="exampleModal" id="questionModalButton">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn btn-default" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title" id="exampleModalLabel">Submit Your Question</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal" onSubmit={this.handleFormSubmit}>
                                    <div className="form-group">
                                        <label className="control-label">Question:</label>
                                        <input type="text" className="form-control" id="recipient-question" ref="question"></input>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">Description:</label>
                                        <textarea className="form-control" id="recipient-text" ref="description"></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="Submit" className="btn btn-default" data-dismiss="modal" className="form-horizontal">Close</button>
                                <button type="button" className="btn btn-primary">Send message</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>;
    }
}

ForumPage.propTypes = {};

export default ForumPage;
