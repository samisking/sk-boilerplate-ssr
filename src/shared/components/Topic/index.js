import React, { PropTypes } from 'react';

const Topic = ({ match }) =>
  <div>
    <h3>This is what I matched on: {match.params.topicId}</h3>
  </div>;

Topic.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      topicId: PropTypes.string
    })
  })
};

export default Topic;
