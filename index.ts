import * as request from "request-promise";

export interface Device {
  id: string;
  label: string;
}

export default class SmartThingsRestApi {
  private baseUrl: string;
  private token: string;

  constructor(baseUrl: string, token: string) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  getAttributeValue(id: string, attribute: string): Promise<any> {
    return request({
      uri: `${this.baseUrl}device/${id}/attribute/${attribute}`,
      headers: {
        Authorization: `Bearer ${this.token}`
      },
      json: true
    })
      .then((result) => {
        return result.value;
      });
  }

  executeCommand(id: string, command: string, ...args: any[]): Promise<void> {
    const argsString = args.map((arg) => {
      return `arg=${encodeURIComponent(arg)}`;
    }).join('&');
    return request({
      method: 'POST',
      uri: `${this.baseUrl}device/${id}/command/${command}?${argsString}`,
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  listDevices(): Promise<Device[]> {
    return request({
      uri: `${this.baseUrl}devices`,
      headers: {
        Authorization: `Bearer ${this.token}`
      },
      json: true
    });
  }
}
