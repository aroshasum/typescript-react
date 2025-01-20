import { DashboardContextProps } from '@/types/global-types';


export class MockWebSocket {
  private messageCounter: number;
  private readonly listeners: { message: any[]; error: any[]; close: any[]; open: any[] };

  constructor() {
    this.listeners = {
      open: [],
      message: [],
      close: [],
      error: []
    };
    this.messageCounter = 0;

    setTimeout(() => {
      this.triggerEvent('open', {});
    }, 100);

    setInterval(() => {
      if(this.messageCounter === mockData.length) {
        this.messageCounter = 0;
      }

      this.triggerEvent('message', { data: {...mockData[this.messageCounter], timestamp: new Date().toLocaleString()}});
      this.messageCounter++;
    }, 2000);

    setTimeout(() => {
      this.triggerEvent('close', {});
    }, 10000);
  }

  send(message) {
    console.log('Client sent message: ', message);
  }

  triggerEvent(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((listener) => listener(data));
    }
  }

  on(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event].push(callback);
    }
  }
}

export const mockData: DashboardContextProps[] = [
  {
    visitors: 15,
    changeVisitors: 10.1,
    sales: 300,
    changeSales: 23.4,
    conversionRate: 3.33,
    changeConversionRate: 0.33,
  },{
    visitors: 18,
    changeVisitors: 15.2,
    sales: 410,
    changeSales: 33.3,
    conversionRate: 4.33,
    changeConversionRate: 40.1,
  },{
    visitors: 10,
    changeVisitors: -42.5,
    sales: 228,
    changeSales: -38,
    conversionRate: 1.33,
    changeConversionRate: 28.33,
  },{
    visitors: 22,
    changeVisitors: 80.1,
    sales: 800,
    changeSales: 93.4,
    conversionRate: 8.33,
    changeConversionRate: 66.33,
  },{
    visitors: 20,
    changeVisitors: -10.1,
    sales: 755,
    changeSales: -8.45,
    conversionRate: 6.84,
    changeConversionRate: -20.33,
  },{
    visitors: 25,
    changeVisitors: 12.1,
    sales: 915,
    changeSales: 28.4,
    conversionRate: 9.73,
    changeConversionRate: 36.33,
  },{
    visitors: 5,
    changeVisitors: -75.1,
    sales: 65,
    changeSales: -86.4,
    conversionRate: 1.33,
    changeConversionRate: -95.33,
  }
]
