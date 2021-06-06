import React, {Component} from 'react';
import {ResponsiveGrid} from '@alifd/next';
import { Chart, Area,Legend,Axis,Annotation,Line,Tooltip  } from 'bizcharts';
import ProfitChartVO from "./ProfitChartVO";
import {observer} from "mobx-react";
import {autorun} from "mobx";
import OptionTradingVO from "./OptionTradingVO";
import OptionTradingDAO from "./OptionTradingDAO";
import ConditionDisplay from "../../../../components/ConditionDisplay";

const { Cell } = ResponsiveGrid;

@observer
class ProfitChart extends Component {
    componentDidMount() {
        autorun(() => {
            if(OptionTradingVO.strikePrice && OptionTradingVO.optionCosts){
                OptionTradingDAO.refreshProfitChart();
            }
        });
    }

    render() {
        const labelX={
            formatter:(text, item, index)=> {
                return "$".concat(text);
            }
        };
        const gridY = {
            line: {
                type: 'line',
                style: {
                    stroke: "#E5E5E5",
                    lineWidth: 1,
                    lineDash: [4, 5]
                }
            }
        };
        const labelY={
            formatter:(text, item, index)=> {
                return text < 0 ? "" : text.concat("%");
            }
        };

        return (
            <ConditionDisplay display={ProfitChartVO.isLoaded}>
                <ResponsiveGrid gap={20} className={'option_profit_chart'}>
                    <Cell className="grid-12 section_item" colSpan={12}>
                        <Chart autoFit height={300} data={ProfitChartVO.chartData}>
                            <Legend visible={false} />
                            <Axis
                                name="Expected Profit"
                                title
                                label={labelY}
                                line={{
                                    style:{
                                        stroke: "#E5E5E5",
                                        lineWidth: 1
                                    }
                                }}
                                grid={gridY}
                            />
                            <Axis
                                name="price"
                                label={labelX}
                                line={{
                                    style:{
                                        stroke: "#E5E5E5",
                                        lineWidth: 1
                                    }
                                }}
                            />
                            <Area
                                position="price*Expected Profit"
                                style={{
                                    lineWidth:0,
                                    fill:`${ProfitChartVO.chartFillColor}`,
                                    fillOpacity:1
                                }}
                            />
                            <Tooltip>
                                {(title,items) => {
                                    let dataItem=items[0];
                                    let price=dataItem.title;
                                    let tipProfit=dataItem.value <=0 ? "0" : `${dataItem.value}%`;
                                    return <div className={'toolTips'}>
                                        <div>Price: ${price}</div>
                                        <div>Expected Profit: {tipProfit}</div>
                                    </div>;
                                }}
                            </Tooltip>
                            <Annotation.Line
                                start={ProfitChartVO.annotationStrikePrice.start}
                                end={ProfitChartVO.annotationStrikePrice.end}
                                style={{
                                    lineWidth:2,
                                    stroke:"#F09316"
                                }}
                                text={{
                                    autoRotate:false,
                                    content:'Strike Price',
                                    offsetX:-30,
                                    offsetY:-2,
                                    style:{
                                        fill: "#555B75",
                                        fontWeight: 500,
                                        fontSize: 14
                                    }
                                }}
                            />
                            <Annotation.Line
                                start={ProfitChartVO.annotationCost.start}
                                end={ProfitChartVO.annotationCost.end}
                                style={{
                                    lineWidth:2,
                                    stroke:"#50DDBB"
                                }}
                                text={{
                                    autoRotate:false,
                                    content:'Cost',
                                    offsetX:-10,
                                    offsetY:-2,
                                    style:{
                                        fill: "#555B75",
                                        fontWeight: 500,
                                        fontSize: 14
                                    }
                                }}
                            />

                            <Annotation.DataMarker
                                position={ProfitChartVO.currentPriceTips}
                                point={{
                                    style: {
                                        fill: "#ffffff",
                                        stroke: "#4E5F7F"
                                    }
                                }}
                                text={{
                                    content: `Current Price:\n$${ProfitChartVO.currentPriceShow}`,
                                    style: {
                                        fill: "#555B75",
                                        textAlign: "left",
                                        fontSize: 16,
                                        fontWeight: 500
                                    }
                                }}
                            />
                        </Chart>
                    </Cell>
                </ResponsiveGrid>
            </ConditionDisplay>
        );
    }
};

export default ProfitChart;
