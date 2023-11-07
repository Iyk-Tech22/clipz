import { AfterContentInit, Component, ContentChildren, QueryList } from "@angular/core";
import { TabComponent } from "../tab/tab.component";

@Component({
    selector: "app-tab-container",
    templateUrl: "./tab-container.component.html",
    styleUrls: ["./tab-container.component.css"]
})

export class TabContainerComponent implements AfterContentInit {

    @ContentChildren(TabComponent)  tabs: QueryList<TabComponent> = new QueryList();
    lists: string[] = ["name","age"]

    ngAfterContentInit(): void {
        const activeTab = this.tabs?.filter(tab => tab.active)
        if (!activeTab || activeTab.length === 0 ){
            this.selectTab(this.tabs!.first)
            console.log(this.tabs)
        }
    }

    selectTab(tab: TabComponent): void {
        this.tabs?.forEach(tab => tab.active = false);
        tab.active = true;
    }



}