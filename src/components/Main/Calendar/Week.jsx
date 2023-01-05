import { PureComponent } from 'react';

class Week extends PureComponent {
  componentDidMount() {
    const { id, mountCallback } = this.props;
    mountCallback(id);
  }

  render() {
    const { id, days, handleDrag } = this.props;

    return (
      <div id={id} className="cal-row" onMouseMove={handleDrag}>
        {days}
      </div>
    );
  }
}

export default Week;
