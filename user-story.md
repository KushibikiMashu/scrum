ユーザーストーリー

```mermaid
classDiagram
    class BasicItem {
        +title : string
        +description : string
        +status : BasicItemStatusType
        (他には、ストーリーポイントとか担当者とかを持つ)
    }    
    
    
    class Epic {
        +item : BasicItem
        +definitionOfDone : DefinitionOfDone
        ユーザーストーリー形式\n(誰が、何をできる。なぜならば〜からだ)
        (ユーザーにとっての価値)
    }
    Epic --> BasicItem
    
    class Feature {
        +item : BasicItem
        +definitionOfDone : DefinitionOfDone
        ユーザーストーリー形式\n(誰が、何をできる。なぜならば〜からだ)
        (epicよりは小さいが、実装できるほど細かくはない)
    }
    Feature --> BasicItem22
    
    class Story {
        +item : BasicItem
        +definitionOfDone : DefinitionOfDone
        ユーザーストーリー形式\n(誰が、何をできる。なぜならば〜からだ)
        (実装できるくらいに小さくする)
    }
    Story --> BasicItem
    
    class Task {
        +item : BasicItem
        作業形式\n(〜を調査する　。〜を実装する)
        (実装できるくらいに小さくする)
    }
    Task --> BasicItem
    
    class ProductBacklogItem {
        +id : number
        +status : BasicItemStatusType
        +item : UserStory
    }
    ProductBacklogItem --> Epic
    ProductBacklogItem --> Feature
    ProductBacklogItem --> Story

    ProductBacklog --> ProductBacklogItem
    class ProductBacklog {
        +id : number
        +items : ProductBacklogItem[]
        (プロダクトオーナーが管理する\n並べ替えもする)
    }
    
    class SprintBacklogItem {
        +item : ImplementableItem
        +created : Date
    }

    SprintBacklog --> SprintBacklogItem

    class SprintBacklog {
        +id : number
        +items : SprintBacklogItem[]
        (開発者が管理する。デイリーで検査する)
    }

    SprintBacklogItem --> Story
    SprintBacklogItem --> Task
```
