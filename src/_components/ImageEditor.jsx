import React from 'react';
import AvatarEditor from 'react-avatar-editor';
import {Button, Glyphicon, Row} from 'react-bootstrap';
import Dropzone from 'react-dropzone';

const defaultImage = "/src/assets/Headshot.jpg";

class ImageEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: defaultImage,
      scale: 1, rotate: 0, borderRadius: 0,
      width: this.props.width, height: this.props.height
    };
    this.handleDrop = this.handleDrop.bind(this);
    this.handleNewImage = this.handleNewImage.bind(this);
    this.handleScale = this.handleScale.bind(this);
    this.handleSetImage = this.handleSetImage.bind(this);
    this.rotateRight = this.rotateRight.bind(this);
    this.setEditorRef = this.setEditorRef.bind(this);
  }
  handleDrop(acceptedFiles) { this.setState({image: acceptedFiles[0]}); }
  handleNewImage(e) { this.setState({image: e.target.files[0]}); }
  handleScale(e) { this.setState({scale: parseFloat(e.target.value)}); }
  handleSetImage(e) {
    const img = this.editor.getImageScaledToCanvas().toDataURL();
    this.props.handleUpdate('profileImg', img);
  }
  rotateRight(e) {
    var rotate = this.state.rotate;
    rotate += 90;
    if (rotate >= 360) rotate -= 360;
    this.setState({ rotate });
  }
  setEditorRef(editor) { if(editor) this.editor = editor; }
  render() {
    const props = this.props;
    const state = this.state;
    return (
      <div>
      <p>Drop or select new profile photo here: <input name="newImage" type="file"
      className="btn btn-default" onChange={this.handleNewImage} /></p>
      <Dropzone onDrop={this.handleDrop} disableClick multiple={false}
          style={{width: props.width, height: props.height, margin:'10px 10px'}}>
          <div style={{display: 'grid'}}><div style={{margin: 'auto'}}><AvatarEditor ref={this.setEditorRef}
            image={state.image} scale={state.scale} rotate={state.rotate}
            borderRadius={state.borderRadius} radius={100}
            width={100} height={100}
          /></div></div>
      </Dropzone>
      <div style={{textAlign: 'center'}}>
        <Button onClick={this.rotateRight}>Rotate <Glyphicon glyph="repeat"/></Button>
        <div className="btn btn-default">Scale <Glyphicon glyph="fullscreen" /> <input name="scale" type="range" onChange={this.handleScale}
          min="1" max="4" step="0.1" defaultValue="1" style={{width: '70%', display: 'inline' }}/></div>{'  '}
        <Button bsStyle='primary' onClick={this.handleSetImage}>Confirm</Button>
      </div>
      </div>
    )
  }
}

export { ImageEditor };
