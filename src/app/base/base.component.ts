import { NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {
  constructor(private spinner: NgxSpinnerService) {}

  spinnerShow(spinnerType: SpinnerType) {
    this.spinner.show(spinnerType);
    setTimeout(() => {
      this.spinnerHideManuel(spinnerType);
    }, 1000);
    // ! spinner'i base olarak app.html'e aldigimiz icin setTimeout'u kapatirsak spinner sürekli döner.
  }

  spinnerHideManuel(spinnerType: SpinnerType) {
    this.spinner.hide(spinnerType);
  }
}

export enum SpinnerType {
  BallScaleRippleMultiple = 'ripple',
  BallScaleMultiple = 'multiple',
  Pacman = 'pacman',
  BallAtom = 'atom',
}
