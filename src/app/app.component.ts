import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { DataBoxComponent } from "./data-box/data-box.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { KeyBlocComponent } from "./key-bloc/key-bloc.component";
import { DataStore } from "./data.store";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    DataBoxComponent,
    KeyBlocComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly store = inject(DataStore);

  handleDelete(): void {
    this.store.clearDataMap();
  }
}
