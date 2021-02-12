import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { Color } from 'ng2-charts';

@Component({
    selector: 'app-shared-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit {
    @Output() chartSelected = new EventEmitter();
    @Input() chartData: any;
    @Input() type: string;
    @Input() labels: string[];
    options: any;
    colorsEmptyObject: Array<Color>;

    ngOnInit() {
        if (this.type === 'bar') {
            this.colorsEmptyObject = [
                {
                    backgroundColor: '#66b3ff',
                    hoverBackgroundColor: '#99ccff'
                }
            ];

            this.options = {
                scaleShowVerticalLines: false,
                responsive: true,
                maintainAspectRatio: true,
                legend: {
                    display: false
                },
                bezierCurve: false,
                scales: {
                    xAxes: [
                        {
                            stacked: true
                        }
                    ],
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                                steps: 1,
                                stepValue: 1,
                                max: 5
                            },
                            stacked: true
                        }
                    ]
                },
                elements: {
                    line: {
                        tension: 0
                    }
                }
            };
        } else {
            this.colorsEmptyObject = [
                {
                    backgroundColor: ['#ff0000', '#ffff00', '#009933'],
                    hoverBackgroundColor: ['#ff3333', '#ffff33', '#00cc44']
                }
            ];

            this.options = {
                responsive: true,
                maintainAspectRatio: false
            };
        }
    }
}
