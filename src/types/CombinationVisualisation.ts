import {LayoutAxis} from 'plotly.js'
import CombinationVisualisationTypes from '~types/CombinationVisualisationTypes'

interface CombinationVisualisation {
    id: string
    title: string
    type: CombinationVisualisationTypes
    fetchFunction: CallableFunction
    xAxis: Partial<LayoutAxis>
    yAxis: Partial<LayoutAxis>
}

export default CombinationVisualisation
