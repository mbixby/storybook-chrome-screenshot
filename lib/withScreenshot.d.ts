import { PartialScreenshotOptions } from './models/options';
export interface WithScreenshot {
    <T = Function>(options?: PartialScreenshotOptions): T;
}
declare let withScreenshot: WithScreenshot;
export default withScreenshot;
