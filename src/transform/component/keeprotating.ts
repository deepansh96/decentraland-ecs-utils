import { ITransformComponent } from "./itransformcomponent";
import TransformSystem from "../system/transfromSystem";

/**
 * Component to rotate entity indefinitely until stop is called
 */
@Component("keepRotatingComponent")
export class KeepRotatingComponent implements ITransformComponent{
    onFinishCallback?: (() => void)

    private rotationVelocity: Quaternion
    private rotation: Quaternion
    private finished: boolean

    constructor(rotationVelocity: Quaternion, onFinishCallback?: ()=>void){
        this.rotationVelocity = rotationVelocity
        this.onFinishCallback = onFinishCallback
        this.rotation = Quaternion.Identity
        this.finished = false

        TransformSystem.createAndAddToEngine()
    }

    update(dt: number): void {
        this.rotation = this.rotation.multiply(this.rotationVelocity.scale(dt))
    }

    hasFinished(): boolean {
        return this.finished
    }

    assignValueToTransform(transform: Transform): void {
        transform.rotation = transform.rotation.multiply(this.rotation)
    }

    stop(){
        this.finished = true
    }
    
}