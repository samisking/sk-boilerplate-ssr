import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../state/counter';
import Counter from '../../components/Counter';

export class CounterScreen extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func,
    count: PropTypes.number
  }

  static defaultProps = {
    dispatch: () => {}
  }

  static ensureData = props => Promise.all([
    props.dispatch(actions.getNewCount(100))
  ])

  componentDidMount() {
    CounterScreen.ensureData(this.props);
  }

  increment = () => {
    this.props.dispatch(actions.increment());
  }

  decrement = () => {
    this.props.dispatch(actions.decrement());
  }

  render() {
    return (
      <Counter
        count={this.props.count || 'loading…'}
        increment={this.increment}
        decrement={this.decrement}
      />
    );
  }
}

export const mapStateToProps = state => ({
  count: state.counter.count
});

export default connect(mapStateToProps)(CounterScreen);
