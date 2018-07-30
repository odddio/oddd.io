import * as React from 'react'

import './styles.scss'

interface Props {
  audioContext: AudioContext
  masterGain: any
}

export class Oscilloscope extends React.Component<Props> {
  public render() {
    return <canvas id="oscilloscope"></canvas>
  }
}