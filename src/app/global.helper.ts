
export class GlobalHelper {

  public static waiting(): void {
    let elem: HTMLElement | null = document.getElementById("waiting");
    if (elem != null) elem.style.display = "block";
  }

  public static stopWainting(): void {
    let elem: HTMLElement | null = document.getElementById("waiting");
    if (elem != null) elem.style.display = "none";
  }
}
