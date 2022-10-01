<template>
    <a-table :columns="columns" :data-source="assets" :pagination="false">

        <template slot="asset" slot-scope="asset">
            <div class="table-avatar-info" >
                <a-avatar shape="square" :src="asset.Image" />
                <div class="avatar-info">
                    <h6>{{asset.Id }}</h6>
                    <p>{{asset.Price }}</p>
                </div>
            </div>
        </template>

        <template slot="status" slot-scope="status">
            <a-tag class="tag-status" :class="status ? 'ant-tag-primary' : 'ant-tag-muted'">
                {{ status ? "ONLINE" : "OFFLINE" }}
            </a-tag>
        </template>

        <template slot="editBtn" slot-scope="row">
            <a-button type="link" :data-id="row.key" class="btn-edit">
                Edit
            </a-button>
        </template>

    </a-table>
</template>
<script>
    const columns = [
        {
            
            title: 'NFT',
            dataIndex: 'asset',
            scopedSlots: { customRender: 'asset' },
        },
        {
            title: 'STATUS',
            dataIndex: 'status',
            scopedSlots: { customRender: 'status' },
        },
        {
            title: '',
            scopedSlots: { customRender: 'editBtn' },
            width: 50,
        },
    ];

    const data = [
        {
            key: '1',
            Contract : "0xe48b4261dcd213603bb4a6b85e200c54510caf50",
            CreatedAt : "",
            Id : 555499,
            Image : "https://uniwpunk-nfts.s3.amazonaws.com/4609.png",
            Listing : Object,
            Name : "uniwpunk",
            Price : "11.8900",
            OwnAddress:"0xe0854938f39359fd8fed1f4077886e29f722fd5b",
            ListedAt:"2022-10-01T09:40:09Z"
        }
    ];

    export default {
        data() {
            return {
                data,
                columns,
            };
        },
        props: {
            assets: {
                type: Array,
                default: () => [
                    {
                        Contract : "0xe48b4261dcd213603bb4a6b85e200c54510caf50",
                        CreatedAt : "",
                        Id : 555499,
                        Image : "https://uniwpunk-nfts.s3.amazonaws.com/4609.png",
                        Listing : Object,
                        Name : "uniwpunk",
                        Price : "11.8900",
                        OwnAddress:"0xe0854938f39359fd8fed1f4077886e29f722fd5b",
                        ListedAt:"2022-10-01T09:40:09Z"
                    }
                ],
            },
        },
    };
</script>