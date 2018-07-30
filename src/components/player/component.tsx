import * as React from 'react'

import './styles.scss'

interface Props {
  audioContext: AudioContext
  masterGain: any
}

interface State {
  volume: string
}

export class Player extends React.Component<Props, State> {
  public state: State = {
    volume: '10',
  }
  private source: string = 'http://ice1.somafm.com/sf1033-128-aac'

  public componentDidMount() {
    this.setupAudio().play()
  }

  public render() {
    return (
      <input 
        type="range"
        id="start"
        name="volume"
        min="0"
        max="10"
        value={this.state.volume} 
        onChange={this.onChange} />
    )
  }

  private setupAudio = (): HTMLAudioElement => {
    this.props.masterGain.gain.value = parseInt(this.state.volume, 10) / 10

    let song = new Audio(this.source)
    song.crossOrigin = 'anonymous'
    let songSource = this.props.audioContext.createMediaElementSource(song)

    songSource.connect(this.props.masterGain)

    return song
  }

  private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.masterGain.gain.value = parseInt(e.target.value, 10) / 10
    this.setState({
      volume: e.target.value,
    })
  }
}