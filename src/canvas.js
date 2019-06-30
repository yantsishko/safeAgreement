import React, { Component } from 'react';

class Canvas extends Component {
  isPainting = false;
  userStrokeStyle = '#000000';
  line = [];
  prevPos = { offsetX: 0, offsetY: 0 };

  onMouseDown = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    this.isPainting = true;
    this.prevPos = { offsetX, offsetY };

    this.isPainting = true;

    this.props.onPaintSign(this.canvas.toDataURL());

    return false;
  };

  onEndPrint = () => {
    this.isPainting = false;
  };

  onMouseMove = ({ nativeEvent }) => {
    if (this.isPainting) {
      let { offsetX, offsetY } = nativeEvent;
      let offSetData = { offsetX, offsetY };

      if (nativeEvent.touches) {
        let rect = this.canvas.getBoundingClientRect();
        const t = nativeEvent.targetTouches[0];
        const evX = t.pageX - rect.left;

        offSetData = {
          offsetX: evX,
          offsetY: t.clientY - rect.top,
        };
      }

      const positionData = {
        start: { ...this.prevPos },
        stop: { ...offSetData },
      };

      this.line = this.line.concat(positionData);
      this.paint(this.prevPos, offSetData, this.userStrokeStyle);

      this.props.onPaintSign(this.canvas.toDataURL());
    }

    return false;
  };

  paint = (prevPos, currPos, strokeStyle) => {
    const { offsetX, offsetY } = currPos;
    const { offsetX: x, offsetY: y } = prevPos;

    this.ctx.beginPath();
    this.ctx.strokeStyle = strokeStyle;

    this.ctx.moveTo(x, y);

    this.ctx.lineTo(offsetX, offsetY);

    this.ctx.stroke();
    this.prevPos = { offsetX, offsetY };
  };

  clear = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  componentDidMount() {
    this.canvas.width = 200;
    this.canvas.height = 100;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 2;
  }

  render() {
    return (
      <div className={ this.props.className }>
        <canvas
          ref={(ref) => (this.canvas = ref)}
          style={{ background: 'white', border: '1px solid black', touchAction: 'none' }}
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onEndPrint}
          onTouchStart={this.onMouseDown}
          onTouchMove={this.onMouseMove}
        />
      </div>
    );
  }
}
export default Canvas;
