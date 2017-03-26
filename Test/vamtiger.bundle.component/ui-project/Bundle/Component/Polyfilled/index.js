const html = `<section class="some-awesome-ui-container"></section>`;

const css = `
                    some-awesome-vamtiger-element .some-awesome-ui-container{width:100%;height:100%;margin:0;padding:0;background-color:orange}
/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRlc3QvdmFtdGlnZXIuYnVuZGxlLmNvbXBvbmVudC91aS1wcm9qZWN0L1NvdXJjZS9VaS9Dc3MvTGF5b3V0L3NvbWUtYXdlc29tZS11aS1jb250YWluZXIvaW5kZXguY3NzIiwiVGVzdC92YW10aWdlci5idW5kbGUuY29tcG9uZW50L3VpLXByb2plY3QvU291cmNlL1VpL0Nzcy9MYXlvdXQvZnVsbC13aWR0aC1hbmQtaGVpZ2h0L2luZGV4LmNzcyIsIlRlc3QvdmFtdGlnZXIuYnVuZGxlLmNvbXBvbmVudC91aS1wcm9qZWN0L1NvdXJjZS9VaS9Dc3MvTGF5b3V0L25vLW1hcmdpbi1hbmQtcGFkZGluZy9pbmRleC5jc3MiLCJUZXN0L3ZhbXRpZ2VyLmJ1bmRsZS5jb21wb25lbnQvdWktcHJvamVjdC9Tb3VyY2UvVWkvQ3NzL0FwcGVhcmFuY2Uvc29tZS1hd2Vzb21lLXVpLWNvbnRhaW5lci9pbmRleC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsMkJDRVEsV0FBWSxBQUNaLFlBQWEsQUNKYixTQUFVLEFBQ1YsVUFBVyxBQ0dYLHVCQUF5QixDSENoQyIsImZpbGUiOiJUZXN0L3ZhbXRpZ2VyLmJ1bmRsZS5jb21wb25lbnQvdWktcHJvamVjdC9Tb3VyY2UvVWkvQ3NzL2luZGV4LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgXCIuLi9uby1tYXJnaW4tYW5kLXBhZGRpbmcvaW5kZXguY3NzXCI7XG5AaW1wb3J0IFwiLi4vZnVsbC13aWR0aC1hbmQtaGVpZ2h0L2luZGV4LmNzc1wiO1xuXG4uc29tZS1hd2Vzb21lLXVpLWNvbnRhaW5lclxue1xuICAgIEBhcHBseSAtLWZ1bGwtd2lkdGgtYW5kLWhlaWdodDtcbiAgICBAYXBwbHkgLS1uby1tYXJnaW4tYW5kLXBhZGRpbmc7XG59IiwiLyoqXG4gKiBMYXlvdXQgU3RhcnQ6IGZ1bGwtd2lkdGgtYW5kLWhlaWdodFxuICoqL1xuOnJvb3Qge1xuICAgIC0tZnVsbC13aWR0aC1hbmQtaGVpZ2h0OiB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgfVxufVxuLyoqXG4gKiBMYXlvdXQgRW5kOiBmdWxsLXdpZHRoLWFuZC1oZWlnaHRcbiAqKi8iLCI6cm9vdCB7XG4gICAgLS1uby1tYXJnaW4tYW5kLXBhZGRpbmc6IHtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgIH1cbn0iLCIvKipcbiAqIEFwcGVhcmFuY2UgU3RhcnQ6IHNvbWUtYXdlc29tZS11aS1jb250YWluZXJcbiAqKi9cbjpyb290XG57XG4gICAgLS1zb21lLWF3ZXNvbWUtdWktY29udGFpbmVyOiB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IG9yYW5nZTtcbiAgICB9XG59XG5cbi5zb21lLWF3ZXNvbWUtdWktY29udGFpbmVyXG57XG4gICAgQGFwcGx5IC0tc29tZS1hd2Vzb21lLXVpLWNvbnRhaW5lcjtcbn1cbi8qKlxuICogQXBwZWFyYW5jZSBFbmQ6IHNvbWUtYXdlc29tZS11aS1jb250YWluZXJcbiAqKi8iXX0= */
            `;

class CustomElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this._initializeUi;
    }

    get _initializeUi() {
        this._css = css;

        this.innerHTML = html;
    }

    set _css(css$$1) {
        if (!this.constructor._setCss) {
            this.constructor._setCss = true;

            this._style = css$$1;
        }
    }

    set _style(css$$1) {
        const style = document.createElement('style');

        style.innerHTML = css$$1;

        document.head.appendChild(style);
    }
}

CustomElement._setCss = false;

class CustomElementCore extends CustomElement {
    constructor() {
        super();
    }
}

class Component extends CustomElementCore {
    constructor() {
        super();
        console.log("Component Constructor");
    }

    static get elementName() {
        const name = 'some-awesome-vamtiger-element';

        return name;
    }
}

customElements.define(Component.elementName, Component);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLWNsaS9UZXN0L3ZhbXRpZ2VyLmJ1bmRsZS5jb21wb25lbnQvdWktcHJvamVjdC9Tb3VyY2UvQ29tcG9uZW50L1VpL0h0bWwvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci1jbGkvVGVzdC92YW10aWdlci5idW5kbGUuY29tcG9uZW50L3VpLXByb2plY3QvU291cmNlL0NvbXBvbmVudC9VaS9Qb2x5ZmlsbGVkL0Nzcy9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLWNsaS9UZXN0L3ZhbXRpZ2VyLmJ1bmRsZS5jb21wb25lbnQvdWktcHJvamVjdC9Tb3VyY2UvQ29tcG9uZW50L1VpL1BvbHlmaWxsZWQvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci1jbGkvVGVzdC92YW10aWdlci5idW5kbGUuY29tcG9uZW50L3VpLXByb2plY3QvU291cmNlL0NvbXBvbmVudC9Db3JlL1BvbHlmaWxsZWQvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci1jbGkvVGVzdC92YW10aWdlci5idW5kbGUuY29tcG9uZW50L3VpLXByb2plY3QvU291cmNlL0NvbXBvbmVudC9NYWluL1BvbHlmaWxsZWQvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBodG1sID0gYDxzZWN0aW9uIGNsYXNzPVwic29tZS1hd2Vzb21lLXVpLWNvbnRhaW5lclwiPjwvc2VjdGlvbj5gO1xuXG5leHBvcnQgZGVmYXVsdCBodG1sOyIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgY3NzID0gYFxuICAgICAgICAgICAgICAgICAgICBzb21lLWF3ZXNvbWUtdmFtdGlnZXItZWxlbWVudCAuc29tZS1hd2Vzb21lLXVpLWNvbnRhaW5lcnt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO21hcmdpbjowO3BhZGRpbmc6MDtiYWNrZ3JvdW5kLWNvbG9yOm9yYW5nZX1cbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbFJsYzNRdmRtRnRkR2xuWlhJdVluVnVaR3hsTG1OdmJYQnZibVZ1ZEM5MWFTMXdjbTlxWldOMEwxTnZkWEpqWlM5VmFTOURjM012VEdGNWIzVjBMM052YldVdFlYZGxjMjl0WlMxMWFTMWpiMjUwWVdsdVpYSXZhVzVrWlhndVkzTnpJaXdpVkdWemRDOTJZVzEwYVdkbGNpNWlkVzVrYkdVdVkyOXRjRzl1Wlc1MEwzVnBMWEJ5YjJwbFkzUXZVMjkxY21ObEwxVnBMME56Y3k5TVlYbHZkWFF2Wm5Wc2JDMTNhV1IwYUMxaGJtUXRhR1ZwWjJoMEwybHVaR1Y0TG1OemN5SXNJbFJsYzNRdmRtRnRkR2xuWlhJdVluVnVaR3hsTG1OdmJYQnZibVZ1ZEM5MWFTMXdjbTlxWldOMEwxTnZkWEpqWlM5VmFTOURjM012VEdGNWIzVjBMMjV2TFcxaGNtZHBiaTFoYm1RdGNHRmtaR2x1Wnk5cGJtUmxlQzVqYzNNaUxDSlVaWE4wTDNaaGJYUnBaMlZ5TG1KMWJtUnNaUzVqYjIxd2IyNWxiblF2ZFdrdGNISnZhbVZqZEM5VGIzVnlZMlV2VldrdlEzTnpMMEZ3Y0dWaGNtRnVZMlV2YzI5dFpTMWhkMlZ6YjIxbExYVnBMV052Ym5SaGFXNWxjaTlwYm1SbGVDNWpjM01pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJa0ZCUjBFc01rSkRSVkVzVjBGQldTeEJRVU5hTEZsQlFXRXNRVU5LWWl4VFFVRlZMRUZCUTFZc1ZVRkJWeXhCUTBkWUxIVkNRVUY1UWl4RFNFTm9ReUlzSW1acGJHVWlPaUpVWlhOMEwzWmhiWFJwWjJWeUxtSjFibVJzWlM1amIyMXdiMjVsYm5RdmRXa3RjSEp2YW1WamRDOVRiM1Z5WTJVdlZXa3ZRM056TDJsdVpHVjRMbU56Y3lJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYklrQnBiWEJ2Y25RZ1hDSXVMaTl1YnkxdFlYSm5hVzR0WVc1a0xYQmhaR1JwYm1jdmFXNWtaWGd1WTNOelhDSTdYRzVBYVcxd2IzSjBJRndpTGk0dlpuVnNiQzEzYVdSMGFDMWhibVF0YUdWcFoyaDBMMmx1WkdWNExtTnpjMXdpTzF4dVhHNHVjMjl0WlMxaGQyVnpiMjFsTFhWcExXTnZiblJoYVc1bGNseHVlMXh1SUNBZ0lFQmhjSEJzZVNBdExXWjFiR3d0ZDJsa2RHZ3RZVzVrTFdobGFXZG9kRHRjYmlBZ0lDQkFZWEJ3YkhrZ0xTMXVieTF0WVhKbmFXNHRZVzVrTFhCaFpHUnBibWM3WEc1OUlpd2lMeW9xWEc0Z0tpQk1ZWGx2ZFhRZ1UzUmhjblE2SUdaMWJHd3RkMmxrZEdndFlXNWtMV2hsYVdkb2RGeHVJQ29xTDF4dU9uSnZiM1FnZTF4dUlDQWdJQzB0Wm5Wc2JDMTNhV1IwYUMxaGJtUXRhR1ZwWjJoME9pQjdYRzRnSUNBZ0lDQWdJSGRwWkhSb09pQXhNREFsTzF4dUlDQWdJQ0FnSUNCb1pXbG5hSFE2SURFd01DVTdYRzRnSUNBZ2ZWeHVmVnh1THlvcVhHNGdLaUJNWVhsdmRYUWdSVzVrT2lCbWRXeHNMWGRwWkhSb0xXRnVaQzFvWldsbmFIUmNiaUFxS2k4aUxDSTZjbTl2ZENCN1hHNGdJQ0FnTFMxdWJ5MXRZWEpuYVc0dFlXNWtMWEJoWkdScGJtYzZJSHRjYmlBZ0lDQWdJQ0FnYldGeVoybHVPaUF3TzF4dUlDQWdJQ0FnSUNCd1lXUmthVzVuT2lBd08xeHVJQ0FnSUgxY2JuMGlMQ0l2S2lwY2JpQXFJRUZ3Y0dWaGNtRnVZMlVnVTNSaGNuUTZJSE52YldVdFlYZGxjMjl0WlMxMWFTMWpiMjUwWVdsdVpYSmNiaUFxS2k5Y2JqcHliMjkwWEc1N1hHNGdJQ0FnTFMxemIyMWxMV0YzWlhOdmJXVXRkV2t0WTI5dWRHRnBibVZ5T2lCN1hHNGdJQ0FnSUNBZ0lHSmhZMnRuY205MWJtUXRZMjlzYjNJNklHOXlZVzVuWlR0Y2JpQWdJQ0I5WEc1OVhHNWNiaTV6YjIxbExXRjNaWE52YldVdGRXa3RZMjl1ZEdGcGJtVnlYRzU3WEc0Z0lDQWdRR0Z3Y0d4NUlDMHRjMjl0WlMxaGQyVnpiMjFsTFhWcExXTnZiblJoYVc1bGNqdGNibjFjYmk4cUtseHVJQ29nUVhCd1pXRnlZVzVqWlNCRmJtUTZJSE52YldVdFlYZGxjMjl0WlMxMWFTMWpiMjUwWVdsdVpYSmNiaUFxS2k4aVhYMD0gKi9cbiAgICAgICAgICAgIGA7XG5cbmV4cG9ydCBkZWZhdWx0IGNzczsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBodG1sIGZyb20gJy4uL0h0bWwvaW5kZXguanMnO1xuaW1wb3J0IGNzcyBmcm9tICcuL0Nzcy9pbmRleC5qcyc7XG5cbmNsYXNzIEN1c3RvbUVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMuX2luaXRpYWxpemVVaTtcbiAgICB9XG5cbiAgICBnZXQgX2luaXRpYWxpemVVaSgpIHtcbiAgICAgICAgdGhpcy5fY3NzID0gY3NzO1xuXG4gICAgICAgIHRoaXMuaW5uZXJIVE1MID0gaHRtbDtcbiAgICB9XG5cbiAgICBzZXQgX2Nzcyhjc3MpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbnN0cnVjdG9yLl9zZXRDc3MpIHtcbiAgICAgICAgICAgIHRoaXMuY29uc3RydWN0b3IuX3NldENzcyA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMuX3N0eWxlID0gY3NzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0IF9zdHlsZShjc3MpIHtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXG4gICAgICAgIHN0eWxlLmlubmVySFRNTCA9IGNzcztcblxuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICB9XG59XG5cbkN1c3RvbUVsZW1lbnQuX3NldENzcyA9IGZhbHNlO1xuXG5leHBvcnQgZGVmYXVsdCBDdXN0b21FbGVtZW50OyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEN1c3RvbUVsZW1lbnQgZnJvbSAnLi4vLi4vVWkvUG9seWZpbGxlZC9pbmRleC5qcyc7XG5cbmNsYXNzIEN1c3RvbUVsZW1lbnRDb3JlIGV4dGVuZHMgQ3VzdG9tRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDdXN0b21FbGVtZW50Q29yZTsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBDdXN0b21FbGVtZW50Q29yZSBmcm9tICcuLi8uLi9Db3JlL1BvbHlmaWxsZWQvaW5kZXguanMnO1xuXG5jbGFzcyBDb21wb25lbnQgZXh0ZW5kcyBDdXN0b21FbGVtZW50Q29yZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ29tcG9uZW50IENvbnN0cnVjdG9yXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgZWxlbWVudE5hbWUoKSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSAnc29tZS1hd2Vzb21lLXZhbXRpZ2VyLWVsZW1lbnQnO1xuXG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKENvbXBvbmVudC5lbGVtZW50TmFtZSwgQ29tcG9uZW50KTsiXSwibmFtZXMiOlsiY3NzIl0sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLElBQUksR0FBRyxDQUFDLHFEQUFxRCxDQUFDLENBQUMsQUFFckU7O0FDRkEsTUFBTSxHQUFHLEdBQUcsQ0FBQzs7O1lBR0QsQ0FBQyxDQUFDLEFBRWQ7O0FDRkEsTUFBTSxhQUFhLFNBQVMsV0FBVyxDQUFDO0lBQ3BDLFdBQVcsR0FBRztRQUNWLEtBQUssRUFBRSxDQUFDO0tBQ1g7O0lBRUQsaUJBQWlCLEdBQUc7UUFDaEIsSUFBSSxDQUFDLGFBQWEsQ0FBQztLQUN0Qjs7SUFFRCxJQUFJLGFBQWEsR0FBRztRQUNoQixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQzs7UUFFaEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7S0FDekI7O0lBRUQsSUFBSSxJQUFJLENBQUNBLE1BQUcsRUFBRTtRQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRTtZQUMzQixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7O1lBRWhDLElBQUksQ0FBQyxNQUFNLEdBQUdBLE1BQUcsQ0FBQztTQUNyQjtLQUNKOztJQUVELElBQUksTUFBTSxDQUFDQSxNQUFHLEVBQUU7UUFDWixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztRQUU5QyxLQUFLLENBQUMsU0FBUyxHQUFHQSxNQUFHLENBQUM7O1FBRXRCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3BDO0NBQ0o7O0FBRUQsYUFBYSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsQUFFOUI7O0FDbkNBLE1BQU0saUJBQWlCLFNBQVMsYUFBYSxDQUFDO0lBQzFDLFdBQVcsR0FBRztRQUNWLEtBQUssRUFBRSxDQUFDO0tBQ1g7Q0FDSixBQUVEOztBQ05BLE1BQU0sU0FBUyxTQUFTLGlCQUFpQixDQUFDO0lBQ3RDLFdBQVcsR0FBRztRQUNWLEtBQUssRUFBRSxDQUFDO1FBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0tBQ3hDOztJQUVELFdBQVcsV0FBVyxHQUFHO1FBQ3JCLE1BQU0sSUFBSSxHQUFHLCtCQUErQixDQUFDOztRQUU3QyxPQUFPLElBQUksQ0FBQztLQUNmO0NBQ0o7O0FBRUQsY0FBYyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyJ9