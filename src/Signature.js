import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Button, Grid } from "@material-ui/core";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  canvas: {
    border: "2px dotted #ccc",
    borderRadius: "5px",
    cursor: "crosshair",
    height: 160,
    width: 320
  },
  control: {
    padding: theme.spacing(2)
  }
});
// const Signature = () => {
class Signature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signed: false,
      drawing: false,
      mousePos: { x: 0, y: 0 },
      lastPos: { x: 0, y: 0 }
    };

    this.canvas = React.createRef();

    this.initCanvas = this.initCanvas.bind(this);

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);

    this.handleClearCanvas = this.handleClearCanvas.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.drawing = this.drawing.bind(this);
    this.getMousePos = this.getMousePos.bind(this);
  }

  componentDidMount() {
    this.initCanvas();
  }

  initCanvas() {
    console.log("initCanvas()");
    this.ctx = this.canvas.current.getContext("2d");
    this.ctx.strokeStyle = "#0055ff";
    this.ctx.lineWidth = 2;
  }

  drawing(e) {
    const { drawing, mousePos, lastPos } = this.state;
    if (drawing) {
      this.ctx.moveTo(lastPos.x, lastPos.y);
      this.ctx.lineTo(mousePos.x, mousePos.y);
      this.ctx.stroke();
      this.setState({ lastPos: mousePos, signed: true });
    }
  }

  getMousePos(e) {
    return { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
  }

  getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top
    };
  }

  handleMouseDown(e) {
    this.setState({ drawing: true, lastPos: this.getMousePos(e) });
  }
  handleMouseUp(e) {
    this.setState({ drawing: false });
  }
  handleMouseMove(e) {
    this.setState({ mousePos: this.getMousePos(e) });
    this.drawing(e);
  }

  handleTouchStart(e) {
    e.preventDefault();
    const mousePos = this.getTouchPos(this.canvas.current, e);
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent("mousedown", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    this.canvas.current.dispatchEvent(mouseEvent);
    this.setState({ mousePos });
  }

  handleTouchEnd(e) {
    const mouseEvent = new MouseEvent("mouseup", {});
    this.canvas.current.dispatchEvent(mouseEvent);
  }

  handleTouchMove(e) {
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    this.canvas.current.dispatchEvent(mouseEvent);
  }

  handleClearCanvas(e) {
    this.canvas.current.width = this.canvas.current.width;
    this.setState({ signed: false });
  }

  handleSubmit(e) {}

  render() {
    const { classes } = this.props;
    const { signed } = this.state;
    return (
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <p>Sign in the box below and save your signature as an image!</p>
        </Grid>
        <Grid item xs={12}>
          <canvas
            ref={this.canvas}
            className={classes.canvas}
            onMouseDown={this.handleMouseDown}
            onMouseMove={this.handleMouseMove}
            onMouseUp={this.handleMouseUp}
            onTouchStart={this.handleTouchStart}
            onTouchMove={this.handleTouchMove}
            onTouchEnd={this.handleTouchEnd}
          >
            Sorry buddy, get a better browser!
          </canvas>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
            disabled={!signed}
          >
            Submit signature
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleClearCanvas}
            disabled={!signed}
          >
            Clear signature
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Signature);
