import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from "@angular/core";
import { DataStore } from "../data.store";

@Component({
  selector: "data-box",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./data-box.component.html",
  styleUrl: "./data-box.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataBoxComponent {
  num = input.required<number>();

  readonly store = inject(DataStore);

  handleClick(): void {
    this.store.setSelectedBoxIndex(this.num());

    if (!this.store.areKeysShown()) {
      this.store.setAreKeysShown(true);
    }
  }
}
