import { ClassType } from 'class-transformer/ClassTransformer';

/**
 * This is the insecure resource controller base class. It is not protected by authentication.
 * Extending this class means that there is no check if the user is authenticated.
 *
 * It is usually wrong to extend this class directly. Use SecureResourceController.
 */
export class InsecureResourceController {
  public static Resource: ClassType<any>;
}
