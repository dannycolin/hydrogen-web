/*
Copyright 2020 Bruno Windels <bruno@windels.cloud>
Copyright 2020 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/*
need better naming, but
entry = event or gap from matrix layer
tile = item on visual timeline like event, date separator?, group of joined events


shall we put date separators as marker in EventViewItem or separate item? binary search will be complicated ...


pagination ...

on the timeline viewmodel (containing the TilesCollection?) we'll have a method to (un)load a tail or head of
the timeline (counted in tiles), which results to a range in sortKeys we want on the screen. We pass that range
to the room timeline, which unload entries from memory.
when loading, it just reads events from a sortkey backwards or forwards...
*/
import {TilesCollection} from "./TilesCollection.js";
import {tilesCreator} from "./tilesCreator.js";
import {ViewModel} from "../../../ViewModel.js";

export class TimelineViewModel extends ViewModel {
    constructor(options) {
        super(options);
        const {room, timeline, ownUserId} = options;
        this._timeline = this.track(timeline);
        // once we support sending messages we could do
        // timeline.entries.concat(timeline.pendingEvents)
        // for an ObservableList that also contains local echos
        this._tiles = new TilesCollection(timeline.entries, tilesCreator({room, ownUserId, clock: this.clock}));
    }

    async load() {
        await this._timeline.load();
    }

    /**
     * @return {bool} startReached if the start of the timeline was reached
     */
    async loadAtTop() {
        if (this.isDisposed) {
            // stop loading more, we switched room
            return true;
        }
        const firstTile = this._tiles.getFirst();
        if (firstTile.shape === "gap") {
            return await firstTile.fill();
        } else {
            await this._timeline.loadAtTop(10);
            return false;
        }
    }

    unloadAtTop(tileAmount) {
        // get lowerSortKey for tile at index tileAmount - 1
        // tell timeline to unload till there (included given key)
    }

    loadAtBottom() {

    }

    unloadAtBottom(tileAmount) {
        // get upperSortKey for tile at index tiles.length - tileAmount
        // tell timeline to unload till there (included given key)
    }

    get tiles() {
        return this._tiles;
    }
}
