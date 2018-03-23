

export enum AccessPermissions {
    ExecuteByOthers = 1 << 0,
    WriteByOthers = 1 << 1,
    ReadByOthers = 1 << 2,
    AllByOthers = ExecuteByOthers | WriteByOthers | ReadByOthers,

    ExecuteByGroup = 1 << 3,
    WriteByGroup = 1 << 4,
    ReadByGroup = 1 << 5,
    AllByGroup = ExecuteByGroup | WriteByGroup | ReadByGroup,

    ExecuteByOwner = 1 << 6,
    WriteByOwner = 1 << 7,
    ReadByOwner = 1 << 8,
    AllByOwner = ExecuteByOwner | WriteByOwner | ReadByOwner,

    Default = WriteByOthers | ReadByOthers | WriteByGroup | ReadByGroup | WriteByOwner | ReadByOwner,

    All = AllByOthers | AllByGroup | AllByOwner,

    // StickyBit       = 1 << 9
}

