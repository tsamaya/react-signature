import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Button, Grid, Paper, TextField } from '@material-ui/core';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  canvas: {
    border: '2px dotted #ccc',
    borderRadius: '4px',
    cursor: 'crosshair',
    width: 300,
    height: 150,
  },
  control: {
    padding: theme.spacing(2),
  },
  signature: {
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '5px',
    '&:hover': {
      boxShadow: '0 0 2px 1px rgba(0, 140, 186, 0.5)',
    },
  },
});
// const Signature = () => {
class Signature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signed: false,
      submitted: false,
      drawing: false,
      mousePos: { x: 0, y: 0 },
      lastPos: { x: 0, y: 0 },
      data: '',
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
    console.log('initCanvas()');
    this.ctx = this.canvas.current.getContext('2d');
  }

  drawing(e) {
    const { drawing, mousePos, lastPos } = this.state;
    if (drawing) {
      this.ctx.strokeStyle = '#0055ff';
      this.ctx.lineWidth = 2;
      this.ctx.moveTo(lastPos.x, lastPos.y);
      this.ctx.lineTo(mousePos.x, mousePos.y);
      this.ctx.stroke();
      this.setState({ lastPos: mousePos, signed: true, submitted: false });
    }
  }

  getMousePos(canvasDom, mouseEvent) {
    const rect = canvasDom.getBoundingClientRect();
    return {
      x: mouseEvent.clientX - rect.left,
      y: mouseEvent.clientY - rect.top,
    };
  }

  getTouchPos(canvasDom, touchEvent) {
    const rect = canvasDom.getBoundingClientRect();
    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top,
    };
  }

  handleMouseDown(e) {
    // console.log('mousedown');
    this.setState({
      drawing: true,
      lastPos: this.getMousePos(this.canvas.current, e),
    });
  }
  handleMouseUp(e) {
    // console.log('mouseup');
    this.setState({ drawing: false });
  }
  handleMouseMove(e) {
    // console.log('mousemove');
    this.setState({ mousePos: this.getMousePos(this.canvas.current, e) });
    this.drawing(e);
  }

  handleTouchStart(e) {
    console.log('touchstart');
    const pos = this.getTouchPos(this.canvas.current, e);
    this.setState({ drawing: true, lastPos: pos });
  }

  handleTouchEnd(e) {
    // console.log('touchend');
    this.setState({ drawing: false });
  }

  handleTouchMove(e) {
    // console.log('touchmove');
    this.setState({ mousePos: this.getTouchPos(this.canvas.current, e) });
    this.drawing(e);
  }

  handleClearCanvas(e) {
    this.canvas.current.width = this.canvas.current.width;
    this.setState({ data: '', signed: false, submitted: false });
  }

  handleSubmit(e) {
    this.setState({ submitted: true, data: this.canvas.current.toDataURL() });
  }

  render() {
    const { classes } = this.props;
    const { data, signed, submitted } = this.state;
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
        <Grid item xs={12}>
          <Grid container justify="flex-start" spacing={3}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
                disabled={!signed || submitted}
              >
                Submit signature
              </Button>
            </Grid>
            <Grid item>
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
        </Grid>
        <Grid item xs={12}>
          <TextField
            rows="5"
            variant="outlined"
            multiline
            fullWidth
            label="Data URL"
            value={data}
            disabled
            helperText="Data URL for your signature will go here!"
          />
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.control}>
            <img
              src={data}
              alt="Your signature will go here!"
              className={classes.signature}
            />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Signature);
