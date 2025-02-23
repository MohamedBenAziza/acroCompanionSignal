import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from "@angular/core";
import { MatTooltipModule } from "@angular/material/tooltip";
import { CommonModule } from "@angular/common";
import { DataStore } from "../data.store";

@Component({
  selector: "key-box",
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: "./key-box.component.html",
  styleUrl: "./key-box.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyBoxComponent {
  key = input.required<string>();
  value = input.required<number>();

  readonly store = inject(DataStore);

  handleClick(): void {
    this.store.setDataMap(this.store.selectedBoxIndex(), {
      key: this.key(),
      value: this.value(),
      keyValue: `${this.key()}${this.value()}`,
    });

    if (this.store.selectedBoxIndex() < this.store.boxes().length) {
      this.store.setSelectedBoxIndex(this.store.selectedBoxIndex() + 1);
    }
  }
}
