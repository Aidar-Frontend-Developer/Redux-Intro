import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";

import { addComment } from "./actions/commentsActions";
import { addUser } from "./actions/usersActions";

// SELECTORS
import { getCommentsCount, getCommentsList, getRecords } from "./reducers";

import createStore from "./store";
import "./index.css";

const store = createStore();

class App extends PureComponent {
  state = {
    commentBody: "Добавить комментарий"
  };

  handleChangeComment = event => {
    this.setState({ commentBody: event.target.value });
  };

  handleKeyDown = event => {
    const { addComment } = this.props;
    const { commentBody } = this.state;
    if (event.keyCode === 13) {
      addComment(commentBody);
      this.setState({ commentBody: "" });
    }
  };

  render() {
    const { record, commentsCount, commentsList } = this.props;
    const { commentBody } = this.state;
    return (
      <main>
        <input
          type="text"
          value={commentBody}
          onChange={this.handleChangeComment}
          onKeyDown={this.handleKeyDown}
        />
        <section>
          <p>
            Count of comments: <strong>{commentsCount}</strong>
            <ul>
              {commentsList.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
            </ul>
          </p>
          <p>
            Count of users: <strong>{record.length}</strong>
            <ul>
              {record.map((record, index) => <li key={index}>{record}</li>)}
            </ul>
          </p>
        </section>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    commentsCount: getCommentsCount(state),
    commentsList: getCommentsList(state),
    record: getRecords(state)
  };
};

const mapDispatchToProps = {
  addComment,
  addUser
};

let AppWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

ReactDOM.render(
  <Provider store={store}>
    <AppWithRedux />
  </Provider>,
  document.getElementById("root")
);
