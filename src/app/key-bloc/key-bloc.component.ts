import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { KeyBoxComponent } from "../key-box/key-box.component";

@Component({
  selector: "key-bloc",
  standalone: true,
  imports: [KeyBoxComponent],
  templateUrl: "./key-bloc.component.html",
  styleUrl: "./key-bloc.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyBlocComponent {
  title = input.required<string>();
  keysValues = input.required<[string, number][]>();
}
