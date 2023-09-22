
IF OBJECT_ID('fn_seq_tbl_ad_menu') IS NOT NULL DROP FUNCTION fn_seq_tbl_ad_menu
IF OBJECT_ID('sp_tbl_ad_menu') IS NOT NULL DROP PROCEDURE sp_tbl_ad_menu
GO
CREATE FUNCTION fn_seq_tbl_ad_menu()
  RETURNS INT
AS
BEGIN
  DECLARE @ID INT = 0
  SELECT @ID = ISNULL(MAX(Id_menu),0)+1 FROM tbl_ad_menu
  RETURN @ID
END
GO
CREATE PROCEDURE sp_tbl_ad_menu
  @ACTION NVARCHAR(40) = NULL,
  @RAWPRM NVARCHAR(255) = NULL,
  @Id_menu INT = NULL,
  @Id_menu_parent INT = NULL,
  @code NVARCHAR(20) = NULL,
  @name NVARCHAR(50) = NULL,
  @description NVARCHAR(255) = NULL,
  @url NVARCHAR(100) = NULL,
  @user_mod NVARCHAR(20) = NULL,
  @date_mod DATETIME = NULL,
  @active INT = NULL
AS
SET NOCOUNT ON
  DECLARE @MSG NVARCHAR(MAX) = ''
  
  IF ISNULL(@ACTION,'') = 'S'
  BEGIN
    SELECT
    A.Id_menu,
    A.Id_menu_parent,
    A.code,
    A.name,
    A.description,
    A.url,
    A.user_mod,
    A.date_mod,
    A.active
    FROM tbl_ad_menu A WHERE 1 = 1
    AND (COALESCE(@Id_menu,A.Id_menu) = A.Id_menu OR @Id_menu IS NULL)
    AND (COALESCE(@Id_menu_parent,A.Id_menu_parent) = A.Id_menu_parent OR @Id_menu_parent IS NULL)
    AND (COALESCE(@code,A.code) = A.code OR @code IS NULL)
    AND (COALESCE(@name,A.name) = A.name OR @name IS NULL)
    AND (COALESCE(@description,A.description) = A.description OR @description IS NULL)
    AND (COALESCE(@url,A.url) = A.url OR @url IS NULL)
    AND (COALESCE(@user_mod,A.user_mod) = A.user_mod OR @user_mod IS NULL)
    AND (COALESCE(@date_mod,A.date_mod) = A.date_mod OR @date_mod IS NULL)
    AND (COALESCE(@active,A.active) = A.active OR @active IS NULL)
  END
  IF ISNULL(@ACTION,'') = 'I'
  BEGIN 
    BEGIN TRY
    BEGIN TRAN
      SET IDENTITY_INSERT tbl_ad_menu ON
      
      SET @Id_menu = dbo.fn_seq_tbl_ad_menu()
      INSERT INTO tbl_ad_menu(
      Id_menu,
      Id_menu_parent,
      code,
      name,
      description,
      url,
      user_mod,
      date_mod,
      active
      )
      VALUES(
      @Id_menu,
      @Id_menu_parent,
      @code,
      @name,
      @description,
      @url,
      @user_mod,
      @date_mod,
      @active
      )
      
      DECLARE @IDENTITY INT = @@IDENTITY
      SELECT A.* FROM tbl_ad_menu A 
      WHERE A.Id_menu = @IDENTITY 
      SET IDENTITY_INSERT tbl_ad_menu OFF
    COMMIT
    END TRY
    BEGIN CATCH
      ROLLBACK
      SET @MSG = ERROR_MESSAGE() + ' ERRLINE > ' + ERROR_LINE() + 'ERRNUMBER > ' + ERROR_NUMBER()
      RAISERROR(@MSG,18,0)
    END CATCH
  END
  
  IF ISNULL(@ACTION,'') = 'U'
  BEGIN
    UPDATE A SET
    A.Id_menu_parent = @Id_menu_parent,
    A.code = @code,
    A.name = @name,
    A.description = @description,
    A.url = @url,
    A.user_mod = @user_mod,
    A.date_mod = @date_mod,
    A.active = @active
    FROM tbl_ad_menu A
    WHERE A.Id_menu = @Id_menu
    
    SELECT A.* FROM tbl_ad_menu A 
    WHERE A.Id_menu = @Id_menu
  END
  
  IF ISNULL(@ACTION,'') = 'D'
  BEGIN
    DELETE
    FROM tbl_ad_menu
    WHERE Id_menu = @Id_menu
    
    SELECT @Id_menu Id_menu
  END
  
SET NOCOUNT OFF
