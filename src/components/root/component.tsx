import * as React from 'react'

import { Player } from 'oddd.io/components/player'
import { Oscilloscope } from 'oddd.io/components/oscilloscope'

import './styles.scss'

interface State {
  audioContext: AudioContext
  masterGain: any
}

export class Root extends React.Component<{}, State> {
  public state: State = {
    audioContext: null,
    masterGain: null,
  }

  public componentDidMount() {
    this.setupAudio()
  }

  public render() {
    if (!this.state.audioContext) {
      return null
    }
    return (
      <div>
        <Oscilloscope
          audioContext={this.state.audioContext}
          masterGain={this.state.masterGain}
        />
        <Player
          audioContext={this.state.audioContext}
          masterGain={this.state.masterGain}
        />
      </div>
    )
  }

  private setupAudio = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const masterGain = audioContext.createGain()
    masterGain.connect(audioContext.destination)

    this.setState({
      audioContext,
      masterGain,
    })
  }
}