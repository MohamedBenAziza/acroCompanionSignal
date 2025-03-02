import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
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

  onClick = output<{ key: string; value: number }>();

  readonly store = inject(DataStore);
}
