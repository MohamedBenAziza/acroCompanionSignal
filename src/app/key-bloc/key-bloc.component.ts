import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from "@angular/core";
import { KeyBoxComponent } from "../key-box/key-box.component";
import { DataStore } from "../data.store";

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

  readonly store = inject(DataStore);

  handleClick(event: { key: string; value: number }): void {
    this.store.updateKeyValue(this.store.selectedBoxIndex(), {
      key: event.key,
      value: event.value,
      keyValue: `${event.key}${event.value}`,
    });
  }
}
