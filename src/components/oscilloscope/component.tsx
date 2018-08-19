import * as React from 'react'

import './styles.scss'

interface Props {
  audioContext: AudioContext
  masterGain: any
}

interface State {
  running: boolean
}

export class Oscilloscope extends React.Component<Props, State> {
  public state: State = {
    running: false,
  }
  private ref: HTMLCanvasElement

  public componentDidMount() {
    this.setState({ running: true })
  }

  public componentWillUnmount() {
    this.setState({ running: false })
  }

  public componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.running && !prevState.running) {
      this.start()
    }
  }

  private start = () => {
    const { audioContext, masterGain } = this.props
    const analyser = audioContext.createAnalyser()
    masterGain.connect(analyser)
    const waveform = new Float32Array(analyser.frequencyBinCount)
    analyser.getFloatTimeDomainData(waveform)

    this.updateWaveform(waveform, analyser)
    this.drawOscilloscope(waveform)
  }

  public render() {
    return <canvas id="oscilloscope" ref={(ref) => this.ref = ref}></canvas>
  }

  private updateWaveform = (waveform: Float32Array, analyser: AnalyserNode) => {
    if (!this.state.running) return
    requestAnimationFrame(this.updateWaveform.bind(this, waveform, analyser))
    analyser.getFloatTimeDomainData(waveform)
  }

  private drawOscilloscope = (waveform: Float32Array) =>  {
    if (!this.state.running) return
    requestAnimationFrame(this.drawOscilloscope.bind(this, waveform))
    const scopeCanvas = this.ref
    const scopeContext = scopeCanvas.getContext('2d')

    scopeCanvas.width = waveform.length
    scopeCanvas.height = 200

    scopeContext.clearRect(0, 0, scopeCanvas.width, scopeCanvas.height)
    scopeContext.beginPath()

    for(let i = 0; i < waveform.length; i++) {
      const x = i
      const y = ( 0.5 + (waveform[i] / 2) ) * scopeCanvas.height

      if(i == 0) {
          scopeContext.moveTo(x, y)
      } else {
          scopeContext.lineTo(x, y)
      }
    }

    scopeContext.stroke()
  }
}